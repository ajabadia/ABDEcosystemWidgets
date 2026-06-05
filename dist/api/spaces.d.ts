import { NextRequest, NextResponse } from 'next/server';
import { Document } from 'mongoose';

interface ISpace extends Document {
    name: string;
    slug: string;
    description?: string;
    type: "TENANT" | "TEAM" | "PERSONAL";
    tenantId: string;
    ownerUserId?: string;
    parentSpaceId?: string;
    materializedPath?: string;
    visibility: "PUBLIC" | "INTERNAL" | "PRIVATE";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare function GET(request: NextRequest): Promise<NextResponse<{
    data: {
        _id: string;
        id: string;
        name: any;
        slug: any;
        type: any;
        tenantId: any;
        parentSpaceId: any;
        visibility: any;
    }[];
}> | NextResponse<{
    error: string;
}>>;

export { GET, type ISpace };
