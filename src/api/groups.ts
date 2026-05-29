// ---------------------------------------------------------------------------
// Permission Groups API — shared handler for all ABD satellite apps
// ---------------------------------------------------------------------------
// Re-export from this module in each app's route.ts file:
//
//   app/api/admin/permissions/groups/route.ts
//   ──────────────────────────────────────────
//   export { GET } from '@ajabadia/ecosystem-widgets/api/groups';
//
// Required peer deps (available in all satellite apps):
//   @ajabadia/satellite-sdk  — ensureIndustrialAccess, connectDB, withTenantContext, getTenantModel
//   next                     — NextResponse, NextRequest
//   mongoose                 — Schema
// ---------------------------------------------------------------------------

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose, { Schema, type Model, type Document, type Types } from "mongoose";
import {
  ensureIndustrialAccess,
  connectDB,
  withTenantContext,
  getTenantModel,
} from "@ajabadia/satellite-sdk";

// ── Schema ────────────────────────────────────────────────────────────────

export interface IPermissionGroup extends Document {
  tenantId: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: Types.ObjectId;
  policyIds: Types.ObjectId[];
  allowedApps: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PermissionGroupSchema = new Schema<IPermissionGroup>(
  {
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: "PermissionGroup", index: true },
    policyIds: [{ type: Schema.Types.ObjectId, ref: "PermissionPolicy" }],
    allowedApps: [{ type: String }],
  },
  { timestamps: true }
);

PermissionGroupSchema.index({ tenantId: 1, slug: 1 }, { unique: true });

function getGroupModel(): Model<IPermissionGroup> {
  return getTenantModel<IPermissionGroup>("PermissionGroup", PermissionGroupSchema);
}

// ── GET handler ───────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  return withTenantContext(async () => {
    try {
      const user = await ensureIndustrialAccess();
      await connectDB();

      const { searchParams } = new URL(request.url);
      const tenantId = searchParams.get("tenantId") || user.tenantId;

      const model = getGroupModel();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawDocs = await model
        .find({ tenantId })
        .sort({ name: 1 })
        .lean() as any[];

      const normalized = rawDocs.map((g: any) => ({
        _id: String(g._id),
        id: String(g._id),
        name: g.name,
        slug: g.slug,
        description: g.description || "",
        tenantId: g.tenantId,
        parentId: g.parentId ? String(g.parentId) : null,
        policyIds: (g.policyIds || []).map((id: any) => String(id)),
        allowedApps: g.allowedApps || [],
      }));

      return NextResponse.json({ data: normalized });
    } catch (error: unknown) {
      console.error("[API_GET_GROUPS_ERROR]", error);
      const err = error as Error;
      const status =
        err.message === "UNAUTHORIZED_ECOSYSTEM_ACCESS" ? 403 : 500;
      return NextResponse.json(
        { error: err.message || "Unauthorized" },
        { status }
      );
    }
  });
}
