import OrderModel from "../models/OrderModel";
import TicketModel from "../models/TicketModel";
import { splitTicketNumbers } from "./Utils";

export function lineOrderMarkers( orders: OrderModel[], numbers : number[]){
    let ranking : any = {winners: [], justOne : [], justTwo : []};
    orders.map(order => {
        order.listaCartelasId.map(ticket  => {
            let newTicket = ticket as unknown as TicketModel;
            let pointsLine1 = 0;
            let pointsLine2 = 0;
            let pointsLine3 = 0;
            let pointsLine4 = 0;
            let pointsLine5 = 0;
            let ticketNumbers = splitTicketNumbers(newTicket.numeros)
            numbers.map(n => {
                if(ticketNumbers.slice(0,5).includes(n)){
                    pointsLine1 += 1;}
                else if(ticketNumbers.slice(5,10).includes(n)){
                    pointsLine2 += 1; }
                else if(ticketNumbers.slice(10,15).includes(n)){
                    pointsLine3 += 1; }
                else if(ticketNumbers.slice(15,20).includes(n)){
                    pointsLine4 += 1; }
                else if(ticketNumbers.slice(20,25).includes(n)){
                    pointsLine5 += 1; }
            })
            if(pointsLine1 == 5 || pointsLine2 == 5|| pointsLine3 == 5|| pointsLine4 == 5|| pointsLine5 == 5){
                ranking.winners.push(order)
            }
            else if(pointsLine1 == 4 || pointsLine2 == 4|| pointsLine3 == 4|| pointsLine4 == 4|| pointsLine5 == 4){
                ranking.justOne.push(order)
            }
            else if(pointsLine1 == 3 || pointsLine2 == 3|| pointsLine3 == 3|| pointsLine4 == 3|| pointsLine5 == 3){
                ranking.justTwo.push(order)
            }
        })
    })
    return ranking;
  }