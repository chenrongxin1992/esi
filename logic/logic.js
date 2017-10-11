/**
 *  @Author:    chenrongxin
 *  @Create Date:   2017-10-11
 *  @Description:   logic
 */
const esi = require('../db/esi')
const async = require('async')

exports.importExcel = function(arg,callback){
	async.eachLimit(arg,20,function(item,cb){
		console.log('item-->',item)
		let new_esi = new esi({
			sc_yanjiulingyu:item.sc_yanjiulingyu,
			wc_yanjiulingyu:item.wc_yanjiulingyu,
			ut_rucanghao:item.ut_rucanghao,
			af_zuozhequanming:item.af_zuozhequanming,
			ti_biaoti:item.ti_biaoti,
			so_qikan:item.so_qikan,
			de_guanjianzi:item.de_guanjianzi,
			ab_zhaiyao:item.ab_zhaiyao,
			c1:item.c1,
			rp:item.rp,
			em:item.em,
			pd:item.pd,
			py:item.py
		})
		new_esi.save(function(err,doc){
			if(err){
				console.log(err.message)
				cb(err)
			}
			console.log('doc-->',doc)
			cb(null)
		})
	},function(err){
		if(err){
			console.log('err-->',err.message)
			callback(err)
		}
		callback(null,null)
	})
}