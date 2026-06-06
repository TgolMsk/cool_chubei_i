<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-filter label="规则">
				<cl-select :options="options.effectiveRule" prop="effectiveRule" :width="150" />
			</cl-filter>
			<cl-filter label="状态">
				<cl-select :options="options.status" prop="status" :width="120" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="搜索钱包地址、默克尔叶结果" :width="260" />
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
	name: 'por-reserve'
});

import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { reactive } from 'vue';
import { useCool } from '/@/cool';

const { service } = useCool();

const options = reactive({
	effectiveRule: [
		{ label: '全站', value: 0, type: 'success' },
		{ label: '指定钱包地址', value: 1, type: 'warning' }
	],
	status: [
		{ label: '关闭', value: 0, type: 'danger' },
		{ label: '开启', value: 1, type: 'success' }
	]
});

const Table = useTable({
	columns: [
		{ type: 'selection', width: 60 },
		{ label: '规则', prop: 'effectiveRule', dict: options.effectiveRule, width: 130 },
		{
			label: '钱包地址',
			prop: 'walletAddress',
			minWidth: 220,
			showOverflowTooltip: true
		},
		{ label: 'ETH储备率', prop: 'ethReserveRate', minWidth: 120 },
		{ label: 'ETH平台资产', prop: 'ethPlatformAsset', minWidth: 140 },
		{ label: 'ETH用户资产', prop: 'ethUserAsset', minWidth: 140 },
		{ label: 'USDT储备率', prop: 'usdtReserveRate', minWidth: 130 },
		{ label: 'USDT平台资产', prop: 'usdtPlatformAsset', minWidth: 150 },
		{ label: 'USDT用户资产', prop: 'usdtUserAsset', minWidth: 150 },
		{ label: 'USDC储备率', prop: 'usdcReserveRate', minWidth: 130 },
		{ label: 'USDC平台资产', prop: 'usdcPlatformAsset', minWidth: 150 },
		{ label: 'USDC用户资产', prop: 'usdcUserAsset', minWidth: 150 },
		{
			label: '默克尔叶结果',
			prop: 'merkleLeafResult',
			minWidth: 220,
			showOverflowTooltip: true
		},
		{
			label: '默克尔叶Level',
			prop: 'merkleLeafLevel',
			minWidth: 180,
			showOverflowTooltip: true
		},
		{ label: '状态', prop: 'status', dict: options.status, width: 100 },
		{ label: '更新时间', prop: 'updateTime', sortable: 'desc', minWidth: 170 },
		{ type: 'op', width: 160 }
	]
});

const input = {
	name: 'el-input',
	props: {
		clearable: true
	}
};

const Upsert = useUpsert({
	dialog: {
		width: '860px'
	},
	props: {
		labelWidth: '120px'
	},
	items: [
		{
			type: 'tabs',
			props: {
				type: 'card',
				labels: [
					{ label: 'ETH', value: 'eth' },
					{ label: 'USDT', value: 'usdt' },
					{ label: 'USDC', value: 'usdc' },
					{ label: '规则', value: 'rule' },
					{ label: '默克尔', value: 'merkle' }
				]
			}
		},
		{ label: 'ETH储备率', prop: 'ethReserveRate', value: '100.00', group: 'eth', component: input },
		{ label: 'ETH平台资产', prop: 'ethPlatformAsset', value: '0', group: 'eth', component: input },
		{ label: 'ETH用户资产', prop: 'ethUserAsset', value: '0', group: 'eth', component: input },
		{ label: 'USDT储备率', prop: 'usdtReserveRate', value: '100.00', group: 'usdt', component: input },
		{ label: 'USDT平台资产', prop: 'usdtPlatformAsset', value: '0', group: 'usdt', component: input },
		{ label: 'USDT用户资产', prop: 'usdtUserAsset', value: '0', group: 'usdt', component: input },
		{ label: 'USDC储备率', prop: 'usdcReserveRate', value: '100.00', group: 'usdc', component: input },
		{ label: 'USDC平台资产', prop: 'usdcPlatformAsset', value: '0', group: 'usdc', component: input },
		{ label: 'USDC用户资产', prop: 'usdcUserAsset', value: '0', group: 'usdc', component: input },
		{
			label: '生效规则',
			prop: 'effectiveRule',
			value: 0,
			group: 'rule',
			component: {
				name: 'el-radio-group',
				options: options.effectiveRule
			},
			required: true
		},
		{
			label: '钱包地址',
			prop: 'walletAddress',
			group: 'rule',
			component: {
				name: 'el-input',
				props: {
					clearable: true,
					placeholder: '生效规则为指定钱包地址时填写'
				}
			}
		},
		{
			label: '启用开关',
			prop: 'status',
			value: 1,
			group: 'rule',
			component: {
				name: 'el-switch',
				props: {
					activeValue: 1,
					inactiveValue: 0
				}
			}
		},
		{
			label: '默克尔叶结果',
			prop: 'merkleLeafResult',
			group: 'merkle',
			component: {
				name: 'el-input',
				props: {
					clearable: true,
					placeholder: '新增时为空将自动生成'
				}
			}
		},
		{
			label: '默克尔叶Level',
			prop: 'merkleLeafLevel',
			value: '',
			group: 'merkle',
			component: {
				name: 'el-input',
				props: {
					type: 'textarea',
					rows: 5,
					placeholder: '默认为空'
				}
			}
		}
	]
});

const Crud = useCrud(
	{
		service: service.por.reserve
	},
	app => {
		app.refresh();
	}
);
</script>
