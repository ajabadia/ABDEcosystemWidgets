import { NextResponse } from 'next/server';
import { Schema } from 'mongoose';
import { withTenantContext, ensureIndustrialAccess, connectDB, getTenantModel } from '@ajabadia/satellite-sdk';

// src/api/spaces.ts
var SpaceSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ["TENANT", "TEAM", "PERSONAL"],
      default: "TENANT"
    },
    tenantId: { type: String, required: true, index: true },
    ownerUserId: { type: String },
    parentSpaceId: { type: String, index: true },
    materializedPath: { type: String, index: true },
    visibility: {
      type: String,
      enum: ["PUBLIC", "INTERNAL", "PRIVATE"],
      default: "INTERNAL"
    },
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);
SpaceSchema.index({ tenantId: 1, parentSpaceId: 1, slug: 1 }, { unique: true });
function getSpaceModel() {
  return getTenantModel("Space", SpaceSchema);
}
async function GET(request) {
  return withTenantContext(async () => {
    try {
      const user = await ensureIndustrialAccess();
      await connectDB();
      const { searchParams } = new URL(request.url);
      const tenantId = searchParams.get("tenantId") || user.tenantId;
      const model = getSpaceModel();
      const rawDocs = await model.find({ tenantId, isActive: true }).sort({ name: 1 }).lean();
      const normalized = rawDocs.map((s) => ({
        _id: String(s._id),
        id: String(s._id),
        name: s.name,
        slug: s.slug,
        type: s.type,
        tenantId: s.tenantId,
        parentSpaceId: s.parentSpaceId || null,
        visibility: s.visibility
      }));
      return NextResponse.json({ data: normalized });
    } catch (error) {
      console.error("[API_GET_SPACES_ERROR]", error);
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
//# sourceMappingURL=spaces.js.map
//# sourceMappingURL=spaces.js.map