package com.sorsix.cookitup.controller

import com.sorsix.cookitup.model.dto.OrderDTO
import com.sorsix.cookitup.service.OrderService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/orders")
class OrderController(val orderService: OrderService) {

    @PostMapping
    fun saveOrder(@RequestBody orderDto:OrderDTO,request: HttpServletRequest):ResponseEntity<Any>
    {
        val order=orderService.save(orderDto)
        return ResponseEntity.ok(order)
    }
    @GetMapping("/ordersCount")
    fun getOrdersCount():ResponseEntity<Any>{
        return ResponseEntity.ok(orderService.getNumberOfOrders())
    }
}