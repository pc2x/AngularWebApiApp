import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { Observable, of } from "rxjs";

export const authGuard = () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if(authService.isAuthenticated()){
        console.log("usuario autenticado");
        return of(true);
    }else{
        router.navigate(["login"])
        return of(false);
    }
};