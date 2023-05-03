import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, of } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { Recipe } from 'src/app/models/recipe';
import { Review } from 'src/app/models/review';
import { CustomerService } from 'src/app/services/customer.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  public customer!: Customer;
  isLoggedIn: any;
  roles: any;
  user: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;
  userAccount: any;
  myOrders: Order[] | null = null;
  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
  ) {
    this.isLoggedIn = this.activateRoute.snapshot.data['data5'];
    this.user = this.activateRoute.snapshot.data['data6'];
  }
  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.getOrders();
    } else {
      this.router.navigate(["/login"])
    }

  }
  getOrders() {
    this.userService.getMyOrders().subscribe(res => {
      this.myOrders = res;
      console.log(res);

    })
  }
  cancelOrder(orderId: string) {
    this.customerService.changeStatusToCanceled(orderId)
      .pipe(
        flatMap(res => {
          this.getOrders()
          return of(res)
        }
        ))
      .subscribe(res => {
        console.log(res);

      })
  }
  finishedOrder(orderId: string) {
    this.customerService.changeStatusToFinished(orderId)
      .pipe(
        flatMap(res => {
          this.getOrders()
          return of(res)
        }
        ))
      .subscribe(res => {
        console.log(res);

      })
  }

}
