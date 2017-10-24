myapp.service('restful', function($rootScope, $state, $http){

	var self = this;
	self.apiurl = "http://localhost/bms/api/";
	
	self.list = {
		loginapi : "login/confirm",
		apps : "login/apps",
        signup : "login/signup",
		
		cashflowbal : "cashflow/getbalance",
		debit : "cashflow/debit",
		trans : "cashflow/trans",
		
		cars : "rentcar/getacars",
		prent : "rentcar/getprents",
		crentsl : "rentcar/getcrents",
		car : "rentcar/getacar",
		saverent : "rentcar/saverent",
		savecar: "rentcar/savecar",
		finishrent : "rentcar/getrent",
		savefinish : "rentcar/savefinish",
		
		bug : "login/bug",
		users : "cpanel/users",
		bugs : "cpanel/bugs",
		appss : "cpanel/apps",
		userd : "cpanel/userdata",

		
		getitems : "dms/dashboard",
        outspayemt : "dms/outspayemt",
        outsincom : "dms/outsincom",
        profit : "dms/profit",
        userdetails : "dms/userdetails",
        uuserdata : "dms/uuserdata",
        dayprofit : "dms/dayprofit",
        clprofit : "dms/clprofit",
        regprofit : "dms/regprofit",
        itemsale : "dms/itemsale",
        dayitemsale : "dms/dayitemsale",
        topitemsale : "dms/topitemsale",
        getbrand : "dms/getbrand",
        getcategory : "dms/getcategory",
        cbrand : "dms/cbrand",
        ccategory : "dms/ccategory",
        
		getsup : "dms/getsup",
        csup : "dms/csup",
        getsup1 : "dms/getsup1",
        usup : "dms/usup",
        
        getpo : "dms/getpo",
        getcpo : "dms/getcpo",
        cpo : "dms/cpo",
        getpo1 : "dms/getpo1",
        getpoitem1 : "dms/getpoitem1",
        getitempo : "dms/getitems",
        cpoitem : "dms/cpoitem",
        compo : "dms/compo",
        getpoco : "dms/getpoco",
        paymentpo : "dms/paymentpo",
        getpoitemedit : "dms/getpoitemedit",
        upoitem : "dms/upoitem",
        dpoitem : "dms/dpoitem",
        dpo : "dms/dpo",
        outssup : "dms/outssup",
        
        getstock : "dms/getstock",
        citem : "dms/citem",
        getitem1 : "dms/getitem1",
        uitem : "dms/uitem",
        getminus : "dms/getminus",
        cminus : "dms/cminus",
        itempurhis : "dms/itempurhis",
        stockconfirm : "dms/stockconfirm",
        getbybar : "dms/getbybar",

        
        getpso : "dms/getpso",
        cso : "dms/cso",
        getso1 : "dms/getso1",
        getsoitem1 : "dms/getsoitem1",
        csoitem : "dms/csoitem",
        comso : "dms/comso",
        getcso : "dms/getcso",
        getpayso : "dms/getpayso",
        paymentso : "dms/paymentso",
        getsoitemedit : "dms/getsoitemedit",
        usoitem : "dms/usoitem",
        dsoitem : "dms/dsoitem",
        dso : "dms/dso",
        getsopayment : "dms/getsopayment",
        
        
        getcli : "dms/getcli",
        getregion : "dms/getregion",
        ccli : "dms/ccli",
        getcl1 : "dms/getcl1",
        ucl : "dms/ucl",
        
        cregion : "dms/cregion",
        outstament : "dms/outstament",
        getsubusers : "dms/getsubusers",
        cuseracc : "dms/cuseracc",
        upass : "dms/upass",
        col : "dms/col",
        getmonthyear : "dms/getmonthyear",
        getpmonthyear : "dms/getpmonthyear",
        expirestocks : "dms/expirestocks",
        getstockforid : "dms/getstockforid",
        getstockmatch : "dms/getstockmatch",
        ustockmatch : "dms/ustockmatch",

        getreturn : "dms/getreturn",
        creturn : "dms/creturn",
        getitemsforcat : "dms/getitemsforcat"

        
        
		
	
		

	}
	


});
