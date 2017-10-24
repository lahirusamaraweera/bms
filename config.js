myapp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.view.html',
        controller : 'login'

    }).state('newdebit', {
        url: '/newdebit',
        templateUrl: 'app/cashflow/cashflow.newdebit.view.html',
        controller : 'cashflow'

    }).state('newcredit', {
        url: '/newcredit',
        templateUrl: 'app/cashflow/cashflow.newcredit.view.html',
        controller : 'cashflow'

    }).state('cashflow', {
        url: '/cashflow',
        templateUrl: 'app/cashflow/cashflow.view.html',
        controller : 'cashflow'

    }).state('home', {
        url: '/home',
        templateUrl: 'app/home/home.view.html',
        controller : 'home'

    }).state('trans', {
        url: '/trans',
        templateUrl: 'app/cashflow/cashflow.trans.view.html',
        controller : 'cashflow'

    }).state('rentacar', {
        url: '/rentacar',
        templateUrl: 'app/rentacar/rentacar.dashboard.view.html',
        controller : 'rentacar'

    }).state('rentacar.cars', {
        url: '/cars',
        templateUrl: 'app/rentacar/rentacar.cars.view.html',
        controller : 'rentacar_car'

    }).state('rentacar.prents', {
        url: '/prents',
        templateUrl: 'app/rentacar/rentacar.prents.view.html',
        controller : 'rentacar_rent'

    }).state('rentacar.crents', {
        url: '/crents',
        templateUrl: 'app/rentacar/rentacar.crents.view.html',
        controller : 'crentss'

    }).state('newrent', {
        url: '/newrent/:cid',
        templateUrl: 'app/rentacar/newrent/rentacar.newrent.view.html',
        controller : 'newrent',

    }).state('newcar', {
        url: '/newcar',
        templateUrl: 'app/rentacar/newcar/rentacar.newcar.view.html',
        controller : 'newcar',

    }).state('finishrent', {
        url: '/finishrent/:rid',
        templateUrl: 'app/rentacar/finishrent/rentacar.finishrent.view.html',
        controller : 'finishrent',

    }).state('bug', {
        url: '/reportaproblem',
        templateUrl: 'app/home/home.bug.view.html',
        controller : 'bug',

    }).state('cpanel', {
        url: '/cpanel',
        templateUrl: 'app/cpanel/cpanel.view.html',
        controller : 'cpanel',

    }).state('usercontrol', {
        url: '/usercontrol',
        templateUrl: 'app/cpanel/usercontrol/cpanel.usercontrol.view.html',
        controller : 'usercontrol',

    }).state('usercontrol.allusers', {
        url: '/allusers/',
        templateUrl: 'app/cpanel/usercontrol/cpanel.usercontrol.allusers.view.html',
        controller : 'usercontrol',

    }).state('usercontrol.userdata', {
        url: '/userdata/:email',
        templateUrl: 'app/cpanel/usercontrol/user/cpanel.user.view.html',
        controller : 'userdata',

    }).state('dms', {
        url: '/dms',
        templateUrl: 'app/dms/dms.view.html',
        controller : 'dms',

    }).state('dms_supplier', {
        url: '/dms_supplier',
        templateUrl: 'app/dms/suppliers/dms.supplier.view.html',
        controller : 'dms_supplier',

    }).state('dms_supplier.all', {
        url: '/all_users',
        templateUrl: 'app/dms/suppliers/dms.supplier.all.view.html',
        controller : 'dms_supplier_all',

    }).state('dms_supplier.new', {
        url: '/new_supplier',
        templateUrl: 'app/dms/suppliers/dms.supplier.new.view.html',
        controller : 'dms_supnew',

    }).state('dms_supplier.edit', {
        url: '/supplier/:sup_id',
        templateUrl: 'app/dms/suppliers/dms.supplier.edit.view.html',
        controller : 'dms_supedit',

    }).state('dms_po', {
        url: '/purchase_orders',
        templateUrl: 'app/dms/po/dms.po.view.html',
        controller : 'dms_po',

    }).state('dms_po.allp', {
        url: '/all_pending_po',
        templateUrl: 'app/dms/po/dms.po.allp.view.html',
        controller : 'dms_po_pending',

    }).state('dms_po.allc', {
        url: '/all_completed_po',
        templateUrl: 'app/dms/po/dms.po.allc.view.html',
        controller : 'dms_po_complete',

    }).state('dms_po.new', {
        url: '/new_po',
        templateUrl: 'app/dms/po/dms.po.new.view.html',
        controller : 'dms_po_new',

    }).state('dms_po.edit', {
        url: '/edit_po/:po_id',
        templateUrl: 'app/dms/po/dms.po.edit.view.html',
        controller : 'dms_po_edit',

    }).state('dms_po.com1', {
        url: '/compo/:po_id',
        templateUrl: 'app/dms/po/dms.po.completed1.view.html',
        controller : 'dms_po_com1',

    }).state('dms_po.edititem', {
        url: '/edititem/:s_id/:po_id',
        templateUrl: 'app/dms/po/dms.po.edit.item.view.html',
        controller : 'dms_po_edititem',

    }).state('dms_po.deleteitem', {
        url: '/deleteitem/:s_id/:po_id',
        templateUrl: 'app/dms/po/dms.po.deleteitem.view.html',
        controller : 'dms_po_deleteitem',

    }).state('dms_item', {
        url: '/item_and_stock',
        templateUrl: 'app/dms/item/dms.item.view.html',
        controller : 'dms_item',

    }).state('dms_item.all', {
        url: '/item_and_stock',
        templateUrl: 'app/dms/item/dms.stock.all.view.html',
        controller : 'dms_item_stock',

    }).state('dms_item.allitem', {
        url: '/items',
        templateUrl: 'app/dms/item/dms.item.allitem.view.html',
        controller : 'dms_item_item',

    }).state('dms_item.new', {
        url: '/new_item',
        templateUrl: 'app/dms/item/dms.item.new.view.html',
        controller : 'dms_item_new',

    }).state('dms_item.config', {
        url: '/Itemm_configuration',
        templateUrl: 'app/dms/item/dms.item.config.view.html',
        controller : 'dms_item_config',

    }).state('dms_item.edit', {
        url: '/edit_item/:i_id',
        templateUrl: 'app/dms/item/dms.item.edit.view.html',
        controller : 'dms_item_edit',

    }).state('dms_item.stockminus', {
        url: '/stock_minus',
        templateUrl: 'app/dms/item/dms.item.minus.view.html',
        controller : 'dms_item_minus',

    }).state('dms_so', {
        url: '/sales_orders',
        templateUrl: 'app/dms/so/dms.so.view.html',
        controller : 'dms_so',

    }).state('dms_so.allp', {
        url: '/pendingsalesorders',
        templateUrl: 'app/dms/so/dms.so.pending.view.html',
        controller : 'dms_so_pending',

    }).state('dms_so.allc', {
        url: '/completedsalesorders',
        templateUrl: 'app/dms/so/dms.so.allc.view.html',
        controller : 'dms_so_completed',

    }).state('dms_so.new', {
        url: '/newsalesorder',
        templateUrl: 'app/dms/so/dms.so.new.view.html',
        controller : 'dms_so_new',

    }).state('dms_so.edit', {
        url: '/editsalesorder/:so_id',
        templateUrl: 'app/dms/so/dms.so.edit.view.html',
        controller : 'dms_so_edit',

    }).state('dms_client', {
        url: '/clients',
        templateUrl: 'app/dms/client/dms.client.view.html',
        controller : 'dms_client',

    }).state('dms_client.all', {
        url: '/clients',
        templateUrl: 'app/dms/client/dms.client.all.view.html',
        controller : 'dms_client_all',

    }).state('dms_client.new', {
        url: '/add_new',
        templateUrl: 'app/dms/client/dms.client.new.view.html',
        controller : 'dms_client_new',

    }).state('dms_so.edititem', {
        url: '/edititem/:s_id/:so_id',
        templateUrl: 'app/dms/so/dms.so.edit.item.view.html',
        controller : 'dms_so_edititem',

    }).state('dms_so.deleteitem', {
        url: '/deleteitem/:s_id/:so_id',
        templateUrl: 'app/dms/so/dms.so.deleteitem.view.html',
        controller : 'dms_so_deleteitem',

    }).state('dms_client.edit', {
        url: '/editclient/:cl_id',
        templateUrl: 'app/dms/client/dms.client.edit.view.html',
        controller : 'dms_client_edit',

    }).state('dms_client.region', {
        url: '/regions',
        templateUrl: 'app/dms/client/dms.client.region.view.html',
        controller : 'dms_client_region',

    }).state('reports', {
        url: '/reports',
        templateUrl: 'app/dms/reports/dms.reports.view.html',
        controller : 'dms_reports',

    }).state('tou', {
        url: '/terms_of_use',
        templateUrl: 'app/login/tou.view.html',
        controller : 'login',

    }).state('signup', {
        url: '/signup',
        templateUrl: 'app/signup/signup.view.html',
        controller : 'signup',

    }).state('dms_config', {
        url: '/configuration',
        templateUrl: 'app/dms/config/dms.config.view.html',
        controller : 'config',

    }).state('dms_config.profile', {
        url: '/Profile',
        templateUrl: 'app/dms/config/dms.config.profile.view.html',
        controller : 'profile',

    }).state('dms_so.payment', {
        url: '/payment',
        templateUrl: 'app/dms/so/dms.so.pay.view.html',
        controller : 'dms_so_payment',

    }).state('dms_item.itemsale', {
        url: '/Item_wise_sale',
        templateUrl: 'app/dms/item/dms.item.itemsale.view.html',
        controller : 'dms_item_itemsale',

    }).state('dms_config.useracc', {
        url: '/useraccounts',
        templateUrl: 'app/dms/config/dms.config.useracc.view.html',
        controller : 'dms_config_useracc',

    }).state('dms_item.smatch', {
        url: '/stockMatch',
        templateUrl: 'app/dms/item/dms.item.smatch.view.html',
        controller : 'dms_item_smatch',

    }).state('dms_item.expire', {
        url: '/expirestocks',
        templateUrl: 'app/dms/item/dms.item.expire.view.html',
        controller : 'dms_item_expire',

    }).state('cpass', {
        url: '/change_password/:acc',
        templateUrl: 'app/home/home.passchange.view.html',
        controller : 'cpasscon',

    }).state('dms_reports', {
        url: '/accounts_and_report',
        templateUrl: 'app/dms/reports/dms.reports.view.html',
        controller : 'dms_reports',

    }).state('dms_reports.expen', {
        url: '/expenditures',
        templateUrl: 'app/dms/reports/dms.reports.expen.view.html',
        controller : 'dms_reports_expen',

    })


}]);

