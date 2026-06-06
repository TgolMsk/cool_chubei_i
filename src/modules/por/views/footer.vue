<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-filter label="状态">
				<cl-select :options="statusDict" prop="status" :width="120" />
			</cl-filter>
			<cl-flex1 />
			<cl-search-key placeholder="搜索链接/邮箱" :width="240" />
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
	name: 'por-footer'
});

import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';

const { service } = useCool();

const statusDict = [
	{
		label: '关闭',
		value: 0,
		type: 'danger'
	},
	{
		label: '开启',
		value: 1,
		type: 'success'
	}
];

const languageDict = [
	{
		label: '英文',
		value: 'en',
		type: 'success'
	},
	{
		label: '中文',
		value: 'zh',
		type: 'primary'
	}
];

const Table = useTable({
	columns: [
		{ type: 'selection', width: 60 },
		{ label: '页面语言', prop: 'language', dict: languageDict, width: 110 },
		{ label: '默克尔树是什么', prop: 'customerSupportEmail', minWidth: 230 },
		{ label: '官方网站', prop: 'listingSupportEmail', minWidth: 170 },
		{ label: '客户支持邮箱', prop: 'wealthEmail', minWidth: 230 },
		{ label: '媒体联系', prop: 'partnershipsEmail', minWidth: 220 },
		{ label: '状态', prop: 'status', dict: statusDict, width: 100 },
		{ label: '更新时间', prop: 'updateTime', sortable: 'desc', minWidth: 170 },
		{ type: 'op', width: 160 }
	]
});

const Upsert = useUpsert({
	dialog: {
		width: '760px'
	},
	props: {
		labelWidth: '150px'
	},
	items: [
		{
			label: '页面语言',
			prop: 'language',
			required: true,
			value: 'en',
			component: {
				name: 'el-radio-group',
				options: languageDict
			}
		},
		{
			label: '默克尔树是什么',
			prop: 'customerSupportEmail',
			required: true,
			value: 'https://en.wikipedia.org/wiki/Merkle_tree',
			component: {
				name: 'el-input',
				props: {
					clearable: true
				}
			}
		},
		{
			label: '官方网站',
			prop: 'listingSupportEmail',
			required: true,
			value: 'https://ethereum.org',
			component: {
				name: 'el-input',
				props: {
					clearable: true
				}
			}
		},
		{
			label: '客户支持邮箱',
			prop: 'wealthEmail',
			required: true,
			value: 'customerservice@ethereumalliance.us',
			component: {
				name: 'el-input',
				props: {
					clearable: true
				}
			}
		},
		{
			label: '媒体联系',
			prop: 'partnershipsEmail',
			required: true,
			value: 'PressContact@ethereumalliance.us',
			component: {
				name: 'el-input',
				props: {
					clearable: true
				}
			}
		},
		{
			label: '启用',
			prop: 'status',
			value: 1,
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
		service: service.por.footer
	},
	app => {
		app.refresh();
	}
);
</script>
