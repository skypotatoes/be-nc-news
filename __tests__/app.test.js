const seed = require('../db/seeds/seed')
const express = require('express')
const app = require('../app')
const request = require('supertest')
const data = require('../db/data/test-data/index')
const db = require('../db/connection')

afterAll(()=> db.end());

beforeEach(()=> {
    return seed(data)
})


describe("app",()=>{
    describe("GET /api/topics",()=>{
        test("status 200 - responds with an array of topic objects",()=>{
            return request(app).get('/api/topics').expect(200)
            .then(({body: {topics}})=>{
                expect(topics).toHaveLength(3);
                topics.forEach(topic =>{
                    expect.objectContaining({
                        description: expect.any(String),
                        slug: expect.any(String)})
                    
                })
            })
        })
    })
    describe("GET /bad-pathway",()=>{
        test("status 404 - path not found", ()=>{
            return request(app).get('/bad-pathway')
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toEqual("Path not found")})
        })
    })
    
    describe("GET /api/articles/:article_id",()=>{
        test("responds with an article object with appropriate properties", ()=>{
            return request(app).get('/api/articles/9')
            .then(({body:{article}})=>{
                
                     })
            })
    })
})