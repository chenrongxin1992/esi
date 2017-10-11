var express = require('express');
var router = express.Router();
const xlsx = require('xlsx')
const busBoy = require('busboy')
const esi = require('../db/esi')
const logic = require('../logic/logic')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//import
router.get('/import',function(req,res){
	res.render('import',{title:'导入excel'})
}).post('/import',function(req,res){
	let excelArray = new Array()
	console.log('headers-->',req.headers)
	let busboy = new busBoy({
		headers: req.headers,
        limits: {
            files: 1,
            fileSize: 50000000
        }
	})
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file.on('limit', function() {
            res.json(formatInfo.resResult(-1,'File is To Large'));
            return
        });
        file.on('data', function(data) {
        	console.log('fieldname-->',fieldname)
        	console.log('file-->',file)
        	console.log('filename-->',filename)
        	console.log('encoding-->',encoding)
        	console.log('mimetype-->',mimetype)
        	console.log('data-->',data)
            console.log('File [' + filename + '] got ' + data.length + ' bytes');
            let workbook = xlsx.read(data);
            let sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2',……]
            let worksheet = workbook.Sheets[sheetNames[0]];// 获取excel的第一个表格
            console.log(worksheet)
            let ref = worksheet['!ref']; //获取excel的有效范围,比如A1:F20
            let reg = /[a-zA-Z]/g;
            ref = ref.replace(reg,"");
            let line = parseInt(ref.split(':')[1]); // 获取excel的有效行数
            console.log("line====>",line);
            // header ['研究领域','研究领域2','入藏号','作者全名','标题','期刊','关键字','摘要','C1','RP','EM','PD','PY'] 

            //循环读出每一行，然后处理 
            for(let i = 2; i <= line; i++){
                if(!worksheet['A'+i] && !worksheet['B'+i] && !worksheet['C'+i] && !worksheet['D'+i] && !worksheet['E'+i] && !worksheet['F'+i] && !worksheet['G'+i] && !worksheet['H'+i]  && !worksheet['I'+i] && !worksheet['J'+i]&& !worksheet['K'+i] && !worksheet['L'+i] && !worksheet['M'+i] && i != 2){   //如果大于2的某行为空,则下面的行不算了
                    break;
                }
                let tempItem = {
                	sc_yanjiulingyu : worksheet['A'+i].v || '',
                	wc_yanjiulingyu : worksheet['B'+i].v || '',
                	ut_rucanghao : worksheet['C'+i].v || '',
                	af_zuozhequanming : worksheet['D'+i].v || '',
                	ti_biaoti : worksheet['E'+i].v || '',
                	so_qikan : worksheet['F'+i].v || '',
                	de_guanjianzi : worksheet['G'+i].v || '',
                	ab_zhaiyao : worksheet['H'+i].v || '' ,
                	c1 : worksheet['I'+i].v || '',
                	rp : worksheet['J'+i].v || '',
                	em : worksheet['K'+i].v || '',
                	pd : worksheet['L'+i].v || '',
                	py : worksheet['M'+i].v || ''
                }

                excelArray.push(tempItem)
            }
            console.log('excelArray-->',excelArray)
            logic.importExcel(excelArray,function(error,result){
            	if(error){
            		console.log(error.message)
            		return res.json({'errCode':-1,'errMsg':error.message})
            	}
            	return res.json({'errCode':-1,'errMsg':'导入成功'})
            })
        })
    })
   /*busboy.on('finish', function() {
        res.writeHead(200);
        //res.end('upload OK!');
    });*/
    return req.pipe(busboy);
})
module.exports = router;
