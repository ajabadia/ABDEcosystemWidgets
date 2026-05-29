import { NextRequest, NextResponse } from 'next/server';
import { Document, Types } from 'mongoose';

interface IPermissionGroup extends Document {
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
declare function GET(request: NextRequest): Promise<NextResponse<{
    data: {
        _id: string;
        id: string;
        name: any;
        slug: any;
        description: any;
        tenantId: any;
        parentId: string | null;
        policyIds: any;
        allowedApps: any;
    }[];
}> | NextResponse<{
    error: string;
}>>;

export { GET, type IPermissionGroup };
