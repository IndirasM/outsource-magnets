export class UserCredentials {
    email: string;
    password: string;
}

export interface UnmappedEntity {
    id: number,
    name: string,
    parentId: number
}

export interface GraphEntity {
    id: string,
    label: string
}

export interface GraphLink {
    source: number,
    target: number
}