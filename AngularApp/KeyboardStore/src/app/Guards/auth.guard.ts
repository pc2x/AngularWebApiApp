import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";

export const authGuard = () => {
     
    const router = inject(Router);
    const authService = inject(AuthService);

    if(authService.isAuthenticated()){
        return true;
    }else{
        router.navigate(["login"])
        return false;
    }
};