import { request, response } from 'express'
import supertest from 'supertest'

import app from './server.js'

describe("POST /api/contact", () =>{
    describe("given a name contactno photo", ()=>{

        // should save the name, contactno ,photo to the database
        // should respond  twith status code 200
        test("should respond  twith status code 200",async  () =>{
            const response = await supertest(app).post("/api/contact").send({
                name:  "rahul",
                contactno:  9087654610,
                photo:  "https://images.pexels.com/photos/13248572/pexels-photo-13248572.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            });
            expect(response.statusCode).toBe(200)
            expect(res.body).toHaveProperty('post')
        })
        // should specify json in the content type header
        test("should specify json in the content type header",async  () =>{
            const response = await request(app).post("/api/contact").send({
                name:  "name",
                contactno:  "contactno",
                photo:  "photo",
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

          // should respond  the json object with contact_id
        test("hould respond  the json object with contact_id",async  () =>{
            const response = await request(app).post("/api/contact").send({
                name:  "name",
                contactno:  "contactno",
                photo:  "photo",
            });
            expect(response.body.id).toBeDefined()
        })

    })

    describe("when the name contactno photo fileds are missing", ()=>{

        // should save the name, contactno ,photo to the database
        // should respond  the json object with id
        // should respond  twith status code 400
        test("should respond  twith status code 400",async  () =>{
            const contactBody =[
                {name: "name"},
                {contactno: "contactno"},
            ]

            for(const body of contactBody) {
                const response = await request(app).post("/api/contact").send(body);
                expect(response.statusCode).toBe(400)
            }
           
        })
        // should specify json in the content type header

    })
})
