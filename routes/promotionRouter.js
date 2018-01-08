const express = require('express');
const promotionRouter = express.Router();

promotionRouter.route('/promotion/:promotionId')
	.all((req,res,next)=>{
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		next();
	})
	.get((req,res,next)=>{
		res.end('promotion id get method');
	})
	.post((req,res,next)=>{
		res.end('promotion id post method');
	})
	.put((req,res,next)=>{
		rs.end('promotion id put method');
	})
	.delete((req,res,next)=>{
		res.end('promotion id delete method');
	})

// promotionRouter.route('/promotion/')
// 	.all((req,res,next)=>{
// 		res.statusCode = 200;
// 		res.setHeader('Content-Type', 'text/html');
// 		res.end('please give promotion id')
// 		next();
// 	})

promotionRouter.route('/promotion')
	.all((req,res,next)=>{
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		next();
	})
	.get((req,res,next)=>{
		res.end('promotion id get method');
	})
	.post((req,res,next)=>{
		res.end('promotion id post method');
	})
	.put((req,res,next)=>{
		rs.end('promotion id put method');
	})
	.delete((req,res,next)=>{
		res.end('promotion id delete method');
	})

module.exports = promotionRouter;