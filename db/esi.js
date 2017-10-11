/**
 *  @Author:    chenrongxin
 *  @Create Date:   2017-10-11
 *  @Description:   数据表
 */
var mongoose = require('./db'),
    Schema = mongoose.Schema,
    moment = require('moment')

var esiSchema = new Schema({          
    sc_yanjiulingyu :{type : String },  //SC研究领域
    wc_yanjiulingyu :{type:String},  //WC研究领域
    ut_rucanghao: {type:String},//ut入藏号
    af_zuozhequanming : {type:String},//af作者全名
    ti_biaoti : {type:String},//ti标题
    so_qikan : {type:String},//so期刊
    de_guanjianzi : {type:String},//de关键字
    ab_zhaiyao : {type:String},//摘要
    c1 : {type:String},
    rp : {type:String},
    em : {type:String},
    pd : {type:String},
    py : {type:String},
    createTime : {type : String, default : moment().format('YYYY-MM-DD HH:mm:ss') },  
    createTimeStamp : {type : String,default:moment().format('X')}
})

module.exports = mongoose.model('esi',esiSchema);