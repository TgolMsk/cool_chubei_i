<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key placeholder="搜索审计ID" :width="220" />
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
	name: 'por-audit'
});

import { useCrud, useTable, useUpsert } from '@cool-vue/crud';
import { useCool } from '/@/cool';

const { service } = useCool();

const Table = useTable({
	columns: [
		{ type: 'selection', width: 60 },
		{ label: '审计ID', prop: 'auditId', minWidth: 180 },
		{ label: '快照时间', prop: 'snapshotTime', sortable: 'desc', minWidth: 180 },
		{ label: '创建时间', prop: 'createTime', sortable: 'desc', minWidth: 170 },
		{ type: 'op', width: 160 }
	]
});

const Upsert = useUpsert({
	dialog: {
		width: '560px'
	},
	props: {
		labelWidth: '90px'
	},
	items: [
		{
			label: '审计ID',
			prop: 'auditId',
			required: true,
			component: {
				name: 'el-input',
				props: {
					clearable: true,
					placeholder: '如 20260430104209'
				}
			}
		},
		{
			label: '快照时间',
			prop: 'snapshotTime',
			required: true,
			component: {
				name: 'el-date-picker',
				props: {
					type: 'datetime',
					valueFormat: 'YYYY-MM-DD HH:mm:ss'
				}
			}
		}
	]
});

const Crud = useCrud(
	{
		service: service.por.audit
	},
	app => {
		app.refresh();
	}
);
</script>
