<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-filter label="独立配置">
				<cl-select :options="options.independentConfig" prop="independentConfig" :width="130" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="搜索钱包地址、登录IP" :width="260" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'por-wallet'
});

import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { reactive } from 'vue';
import { useCool } from '/@/cool';

const { service } = useCool();

const options = reactive({
	independentConfig: [
		{ label: '关闭', value: 0, type: 'info' },
		{ label: '开启', value: 1, type: 'success' }
	]
});

const Table = useTable({
	columns: [
		{ type: 'selection', width: 60 },
		{
			label: '钱包地址',
			prop: 'walletAddress',
			minWidth: 260,
			showOverflowTooltip: true
		},
		{ label: '登录IP', prop: 'loginIp', minWidth: 160 },
		{ label: 'ETH', prop: 'eth', minWidth: 120 },
		{ label: 'USDC', prop: 'usdc', minWidth: 120 },
		{ label: 'USDT', prop: 'usdt', minWidth: 120 },
		{
			label: '独立配置',
			prop: 'independentConfig',
			dict: options.independentConfig,
			width: 120
		},
		{ label: '创建时间', prop: 'createTime', sortable: 'desc', minWidth: 170 },
		{ label: '更新时间', prop: 'updateTime', sortable: 'desc', minWidth: 170 },
		{ type: 'op', buttons: ['edit', 'delete'], width: 150 }
	]
});

const Upsert = useUpsert({
	dialog: {
		width: '620px'
	},
	props: {
		labelWidth: '110px'
	},
	items: [
		{
			label: '钱包地址',
			prop: 'walletAddress',
			required: true,
			component: {
				name: 'el-input',
				props: {
					clearable: true
				}
			}
		},
		{
			label: '登录IP',
			prop: 'loginIp',
			component: {
				name: 'el-input',
				props: {
					clearable: true,
					disabled: true
				}
			}
		},
		{
			label: 'ETH',
			prop: 'eth',
			value: '0',
			component: {
				name: 'el-input',
				props: {
					clearable: true
				}
			}
		},
		{
			label: 'USDC',
			prop: 'usdc',
			value: '0',
			component: {
				name: 'el-input',
				props: {
					clearable: true
				}
			}
		},
		{
			label: 'USDT',
			prop: 'usdt',
			value: '0',
			component: {
				name: 'el-input',
				props: {
					clearable: true
				}
			}
		},
		{
			label: '独立配置',
			prop: 'independentConfig',
			value: 0,
			component: {
				name: 'el-switch',
				props: {
					activeValue: 1,
					inactiveValue: 0
				}
			}
		}
	]
});

const Crud = useCrud(
	{
		service: service.por.wallet
	},
	app => {
		app.refresh();
	}
);
</script>
