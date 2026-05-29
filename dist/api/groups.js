import { NextResponse } from 'next/server';
import { Schema } from 'mongoose';
import { withTenantContext, ensureIndustrialAccess, connectDB, getTenantModel } from '@ajabadia/satellite-sdk';

// src/api/groups.ts
var PermissionGroupSchema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: "PermissionGroup", index: true },
    policyIds: [{ type: Schema.Types.ObjectId, ref: "PermissionPolicy" }],
    allowedApps: [{ type: String }]
  },
  { timestamps: true }
);
PermissionGroupSchema.index({ tenantId: 1, slug: 1 }, { unique: true });
function getGroupModel() {
  return getTenantModel("PermissionGroup", PermissionGroupSchema);
}
async function GET(request) {
  return withTenantContext(async () => {
    try {
      const user = await ensureIndustrialAccess();
      await connectDB();
      const { searchParams } = new URL(request.url);
      const tenantId = searchParams.get("tenantId") || user.tenantId;
      const model = getGroupModel();
      const rawDocs = await model.find({ tenantId }).sort({ name: 1 }).lean();
      const normalized = rawDocs.map((g) => ({
        _id: String(g._id),
        id: String(g._id),
        name: g.name,
        slug: g.slug,
        description: g.description || "",
        tenantId: g.tenantId,
        parentId: g.parentId ? String(g.parentId) : null,
        policyIds: (g.policyIds || []).map((id) => String(id)),
        allowedApps: g.allowedApps || []
      }));
      return NextResponse.json({ data: normalized });
    } catch (error) {
      console.error("[API_GET_GROUPS_ERROR]", error);
      const err = error;
      const status = err.message === "UNAUTHORIZED_ECOSYSTEM_ACCESS" ? 403 : 500;
      return NextResponse.json(
        { error: err.message || "Unauthorized" },
        { status }
      );
    }
  });
}

export { GET };
//# sourceMappingURL=groups.js.map
//# sourceMappingURL=groups.js.map