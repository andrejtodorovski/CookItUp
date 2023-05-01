import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Customer } from "../models/customer"
import { Category } from "../models/category"
import { Ingredient } from "../models/ingredient"
import { orderAdmin } from "../models/orderAdmin"

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    adminUrl = "http://localhost:8080/api/admin"
    constructor(private http: HttpClient) { }
    viewPending(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.adminUrl + '/pending')
    }
    approveAdmin(username:string):Observable<Customer>
    {
        return this.http.get<Customer>(this.adminUrl+'/pending/authorizeAdmin?username='+username)
    }
    addCategory(category:Category):Observable<Category>
    {
        return this.http.post<Category>(this.adminUrl+"/category",category)
    }
    addIngredient(ingredient:Ingredient):Observable<Ingredient>
    {
        return this.http.post<Ingredient>(this.adminUrl+"/ingredient",ingredient)
    }
    viewAdminOrders():Observable<orderAdmin[]>
    {
        return this.http.get<orderAdmin[]>(this.adminUrl+"/orders")
    }
    changeStatus(order:orderAdmin):Observable<orderAdmin>
    {
        return this.http.get<orderAdmin>(this.adminUrl+"/changeStatus/"+order.orderId)
    }


}