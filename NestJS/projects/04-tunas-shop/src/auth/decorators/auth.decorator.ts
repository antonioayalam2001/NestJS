import { applyDecorators, UseGuards } from "@nestjs/common";
import { ValidRoles } from "../interfaces/valid-roles";
import { RoleProtected } from "./role-protected/role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "./user-role-guard";

export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        //AuthGuard pide que si se realice la ejecución del guard, por eso ese si lleva los parentesis
        UseGuards(AuthGuard('jwt'), UserRoleGuard),
        RoleProtected(...roles),
    )
}