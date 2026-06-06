import { type ModuleConfig } from '/@/cool';

export default (): ModuleConfig => {
	return {
		ignore: {
			token: ['/por/verify'],
			NProgress: ['/app/por/audit/options', '/app/por/footer/config']
		},
		views: [
			{
				path: '/por/reserve',
				name: 'por-reserve',
				meta: {
					label: '储备率配置'
				},
				component: () => import('./views/reserve.vue')
			},
			{
				path: '/por/wallet',
				name: 'por-wallet',
				meta: {
					label: '钱包用户'
				},
				component: () => import('./views/wallet.vue')
			},
			{
				path: '/por/audit',
				name: 'por-audit',
				meta: {
					label: '审计快照'
				},
				component: () => import('./views/audit.vue')
			},
			{
				path: '/por/footer',
				name: 'por-footer',
				meta: {
					label: '底部配置'
				},
				component: () => import('./views/footer.vue')
			}
		],
		pages: [
			{
				path: '/por/verify',
				name: 'por-verify',
				meta: {
					process: false,
					label: '默克尔树验证器'
				},
				component: () => import('./pages/verify.vue')
			}
		]
	};
};
