import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor
{
    intercept(req: import("@angular/common/http").HttpRequest<any>, 
    next: import("@angular/common/http").HttpHandler): 
    import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> 
    {
        return next.handle(req).pipe(
            catchError(error =>{
                if(error.status === 401)
                {
                    return throwError("You are not authorized to access this content.");
                }
                if(error.status === 403)
                {
                    return throwError("You are not permited to access this content.");
                }
                if(error.status === 400 && error.error[0].description)
                {
                    return throwError(error.error[0].description);
                }


                if(error instanceof HttpErrorResponse)
                {
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError){
                        return throwError(applicationError);
                    }

                    const serverError = error.error;

                    let modelStateError = '';
                    if(serverError.errors && typeof serverError.errors === 'object')
                    {
                        for (const key in serverError.errors)
                        {
                            if(serverError.errors[key])
                            {
                                modelStateError += serverError.errors[key] + '\n';
                            }
                        }
                    }
                    return throwError(modelStateError || serverError || error || 'Server Error');
                }


            })
        )
    }

}



export const ErrorInterceptorProvider = 
{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor, 
    multi: true
}