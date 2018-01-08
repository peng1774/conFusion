const express = require('express');
const leaderRouter = express.Router();

leaderRouter.route('/leader/:leaderId')
	.all((rqe,res,next)=>{
		res.statusCode = 200;
		res.setHeader('Content-Type','text/html');
		next();
	})
	.get((req,res,next)=>{
		res.end('leader id get method');
	})
	.post((req,res,next)=>{
		res.end('leader id post method');
	})
	.put((req,res,next)=>{
		rs.end('leader id put method');
	})
	.delete((req,res,next)=>{
		res.end('leader id delete method');
	})

// leaderRouter.route('/leader')
// 	.all((req,res,next)=>{
// 		res.statusCode = 200;
// 		res.setHeader('Content-Type','text/html');
// 		res.end('please enter leaderId in router');
// 		next();
// 	})

leaderRouter.route('/leader')
	.all((rqe,res,next)=>{
		res.statusCode = 200;
		res.setHeader('Content-Type','text/html');
		next();
	})
	.get((req,res,next)=>{
		res.end('leader get method');
	})
	.post((req,res,next)=>{
		res.end('leader post method');
	})
	.put((req,res,next)=>{
		rs.end('leader put method');
	})
	.delete((req,res,next)=>{
		res.end('leader delete method');
	})

module.exports = leaderRouter;