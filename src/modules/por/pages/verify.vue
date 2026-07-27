<template>
	<div ref="pageRef" class="por-verify-page">
		<header class="topbar">
			<button class="back" type="button" :aria-label="t('back')" @click="goBack">
				<el-icon><ArrowLeft /></el-icon>
			</button>
			<div class="title">{{ t('pageTitle') }}</div>
		</header>

		<main class="content" :class="{ 'is-result': step === 'result' }">
			<section v-if="step === 'verify'" class="verify-card">
				<div class="illustration" aria-hidden="true">
					<div class="doc">
						<el-icon><UserFilled /></el-icon>
					</div>
					<div class="bubble">···</div>
				</div>

				<div class="verify-heading">
					<div class="status-pill" :class="{ ready: isWalletReady, pending: !isWalletReady }">
						<span aria-hidden="true"></span>
						{{ isWalletReady ? t('proofReady') : t('proofPending') }}
					</div>
					<h1>{{ t('validatorTitle') }}</h1>
				</div>
				<p class="intro">{{ t('validatorIntro') }}</p>

				<div v-if="!isWalletReady" class="wallet-auth-panel">
					<p>{{ t('connectHint') }}</p>
					<el-button class="connect-action" :loading="loading" @click="connectWallet">
						<el-icon><Wallet /></el-icon>
						<span>{{ t('connectButton') }}</span>
					</el-button>
				</div>

				<div v-else class="wallet-strip">
					<div class="wallet-info">
						<span>{{ t('walletAddress') }}</span>
						<strong>{{ walletAddressText }}</strong>
					</div>
					<el-button class="logout-button" @click="logoutWallet">
						<el-icon><SwitchButton /></el-icon>
						<span>{{ t('logout') }}</span>
					</el-button>
				</div>

				<div class="form">
					<label><span>*</span>{{ t('auditId') }}</label>
					<el-select v-model="form.auditId" :placeholder="t('auditPlaceholder')" class="field">
						<el-option
							v-for="item in audits"
							:key="item.auditId"
							:label="item.auditId"
							:value="item.auditId"
						/>
					</el-select>

					<label v-if="isWalletReady"><span>*</span>{{ t('merkleLeaf') }}</label>
					<el-input
						v-if="isWalletReady"
						v-model="form.merkleLeaf"
						class="field leaf-field"
						type="textarea"
						:autosize="{ minRows: 2, maxRows: 3 }"
						resize="none"
						readonly
						:aria-label="t('merkleLeaf')"
					/>

					<el-button class="submit" :disabled="!isWalletReady" :loading="loading" @click="submit">
						<el-icon><Check /></el-icon>
						<span>{{ t('submit') }}</span>
					</el-button>
				</div>
			</section>

			<section v-else class="result-shell">
				<div class="eth-ecosystem-bg" aria-hidden="true">
					<span class="eth-watermark">
						<span class="eth-glyph">
							<i></i>
						</span>
					</span>
					<span class="ecosystem-line line-a"></span>
					<span class="ecosystem-line line-b"></span>
					<span class="ecosystem-line line-c"></span>
					<span class="ecosystem-node node-a"></span>
					<span class="ecosystem-node node-b"></span>
					<span class="ecosystem-node node-c"></span>
					<span class="ecosystem-node node-d"></span>
				</div>

				<div class="pass-card">
					<div class="pass-head">
						<span class="pass-icon">
							<el-icon><Check /></el-icon>
						</span>
						<h2>{{ t('verificationPassed') }}</h2>
					</div>

					<div class="proof-block">
						<p>{{ t('calculationResult') }}</p>
						<strong class="hash">{{ resultMerkleLeaf }}</strong>
					</div>

					<div class="proof-block">
						<p>{{ t('locateLeaf') }}</p>
						<strong class="level">{{ merkleLevelText }}</strong>
					</div>
				</div>

				<div class="reserve-actions">
					<div>
						<h3>{{ t('reserveActions') }}</h3>
						<p>{{ t('reserveActionIntro') }}</p>
					</div>
					<div class="reserve-action-buttons">
						<el-button class="reserve-action primary-action" @click="platformReserveVisible = true">
							<span>{{ t('platformReserveButton') }}</span>
						</el-button>
						<el-button class="reserve-action secondary-action" @click="custodyReserveVisible = true">
							<span>{{ t('custodyReserveButton') }}</span>
						</el-button>
					</div>
				</div>

				<div class="merkle-card">
					<h2>{{ t('merkleTitle') }}</h2>
					<p>{{ t('merkleIntro') }}</p>

					<div class="merkle-tree" :aria-label="t('merkleAria')">
						<div class="tree-row root-row">
							<span class="tree-node root-node">Hash zx234</span>
						</div>
						<div class="tree-arrows two-arrows">
							<span>↑</span>
							<span>↑</span>
						</div>
						<div class="tree-row branch-row">
							<span class="tree-node">Hash ac1234</span>
							<span class="tree-node">Hash bx1234</span>
						</div>
						<div class="tree-arrows four-arrows">
							<span>↑</span>
							<span>↑</span>
							<span>↑</span>
							<span>↑</span>
						</div>
						<div class="tree-row leaf-row">
							<span class="tree-node">Hash bx1234</span>
							<span class="tree-node">Hash ax1234</span>
							<span class="tree-node">Hash fc1234</span>
							<span class="tree-node">Hash wc1234</span>
						</div>
						<div class="tree-arrows four-arrows">
							<span>↑</span>
							<span>↑</span>
							<span>↑</span>
							<span>↑</span>
						</div>
						<div class="tree-row leaf-row">
							<span class="tree-node">Hash gv1234</span>
							<span class="tree-node">Hash fx1234</span>
							<span class="tree-node">Hash rv1234</span>
							<span class="tree-node">Hash nv1234</span>
						</div>
					</div>
				</div>

				<footer class="result-footer">
					<div class="contact-list">
						<a
							v-for="item in contacts"
							:key="item.label"
							class="contact-item"
							:href="item.href"
							:target="item.target"
							:rel="item.rel"
						>
							<span class="contact-label">{{ item.label }}</span>
							<span class="contact-value">{{ item.value }}</span>
						</a>
					</div>
				</footer>
			</section>
		</main>

		<el-dialog
			v-model="platformReserveVisible"
			append-to-body
			class="por-reserve-dialog"
			:title="t('platformReserves')"
			width="620px"
			destroy-on-close
		>
			<section class="reserve-section dialog-section">
				<p>{{ t('snapshotTime') }} {{ snapshotTimeText }}</p>
				<p class="reserve-intro">{{ t('reserveIntro') }}</p>

				<div class="reserve-list">
					<div v-for="asset in reserveAssets" :key="asset.name" class="reserve-card">
						<div class="reserve-top">
							<span class="asset-icon reserve-icon" :class="asset.className" aria-hidden="true">
								<span v-if="asset.name === 'ETH'" class="eth-glyph">
									<i></i>
								</span>
								<span v-else-if="asset.name === 'USDT'" class="usdt-glyph">
									<span>T</span>
								</span>
								<span v-else class="usdc-glyph">
									<span>$</span>
								</span>
							</span>

							<div class="reserve-summary">
								<p>{{ asset.name }} {{ t('reserveRate') }}</p>
								<div>
									<strong>{{ asset.rate }}</strong>
									<span :class="{ warning: !asset.sufficient }">{{ asset.statusText }}</span>
								</div>
							</div>
						</div>

						<div class="reserve-divider"></div>

						<div class="reserve-meta">
							<span>{{ t('userAssets') }}</span>
							<strong>{{ asset.userAsset }}</strong>
						</div>
						<div class="reserve-meta">
							<span>{{ t('walletAssets') }}</span>
							<strong>{{ asset.platformAsset }}</strong>
						</div>
					</div>
				</div>
			</section>
		</el-dialog>

		<el-dialog
			v-model="custodyReserveVisible"
			append-to-body
			class="por-reserve-dialog custody-dialog"
			:title="t('assetBalance')"
			width="620px"
			destroy-on-close
		>
			<section class="custody-section">
				<p class="dialog-time">{{ t('snapshotTime') }} {{ snapshotTimeText }}</p>
				<div class="balance-table">
					<div class="balance-head">
						<span>{{ t('asset') }}</span>
						<span>{{ t('amount') }}</span>
					</div>
					<div v-for="asset in custodyAssets" :key="asset.name" class="balance-row">
						<div class="balance-asset">
							<span class="asset-icon" :class="asset.className" aria-hidden="true">
								<span v-if="asset.name === 'ETH'" class="eth-glyph">
									<i></i>
								</span>
								<span v-else-if="asset.name === 'USDT'" class="usdt-glyph">
									<span>T</span>
								</span>
								<span v-else class="usdc-glyph">
									<span>$</span>
								</span>
							</span>
							<strong>{{ asset.name }}</strong>
						</div>
						<strong class="balance-amount">{{ asset.amount }}</strong>
					</div>
				</div>
			</section>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'por-verify'
});

import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { ArrowLeft, Check, SwitchButton, UserFilled, Wallet } from '@element-plus/icons-vue';
import { useCool } from '/@/cool';
import dayjs from 'dayjs';

declare global {
	interface Window {
		ethereum?: {
			request<T = any>(args: { method: string; params?: any[] }): Promise<T>;
			on?(event: 'accountsChanged', handler: (accounts: string[]) => void): void;
			removeListener?(event: 'accountsChanged', handler: (accounts: string[]) => void): void;
		};
	}
}

type AuditOption = {
	auditId: string;
	snapshotTime: string;
};

type ReserveData = {
	ethReserveRate?: string;
	ethPlatformAsset?: string;
	ethUserAsset?: string;
	usdtReserveRate?: string;
	usdtPlatformAsset?: string;
	usdtUserAsset?: string;
	usdcReserveRate?: string;
	usdcPlatformAsset?: string;
	usdcUserAsset?: string;
};

type WalletData = {
	walletAddress: string;
	loginIp?: string;
	independentConfig?: number;
	eth?: string;
	usdc?: string;
	usdt?: string;
	merkleLeaf: string;
};

type VerifyResult = {
	message: string;
	audit?: AuditOption;
	wallet?: WalletData;
	merkleLeaf?: string;
	merkleLeafResult?: string;
	merkleLeafLevel?: string;
	reserve: ReserveData;
};

type Language = 'en' | 'zh';

type FooterConfig = {
	customerSupportEmail: string;
	listingSupportEmail: string;
	wealthEmail: string;
	partnershipsEmail: string;
	language?: Language;
};

const localeText = {
	en: {
		pageTitle: 'Ethereum Service Platform Proof of Reserves (PoR)',
		back: 'Back',
		connectTitle: 'Connect Wallet',
		connectIntro: 'Authorize your wallet address to enter the Merkle Tree Validator.',
		connectButton: 'Connect Wallet',
		connectHint: 'Authorize wallet access to generate the Merkle leaf and enable verification.',
		validatorTitle: 'Merkle Tree Validator',
		proofReady: 'Proof Ready',
		proofPending: 'Wallet Required',
		validatorIntro:
			'Enter your Merkle leaf to check whether your account assets match the Merkle tree. If the verification passes and the balance is accurate, your assets are included in the Merkle tree and protected.',
		walletAddress: 'Wallet',
		logout: 'Disconnect',
		auditId: 'Audit ID',
		auditPlaceholder: 'Select Audit ID',
		merkleLeaf: 'Merkle Leaf',
		submit: 'Submit',
		assetBalance: 'Your Asset Balance',
		platformReserves: 'Platform Asset Reserves',
		reserveActions: 'Reserve Details',
		reserveActionIntro: 'Open platform reserve ratios or the wallet asset balance used for this proof.',
		platformReserveButton: 'Platform Reserves',
		custodyReserveButton: 'Your Custodied Reserves',
		reserveIntro:
			'Compare platform wallet assets with user assets to calculate each reserve ratio. A ratio of 100% or more indicates sufficient reserves.',
		snapshotTime: 'Snapshot time:',
		asset: 'Asset',
		amount: 'Amount',
		reserveRate: 'Reserve Ratio',
		userAssets: 'User Assets',
		walletAssets: 'Wallet Assets',
		reserveSufficient: 'Reserves sufficient',
		reserveInsufficient: 'Reserves insufficient',
		verificationPassed: 'Verification Passed',
		calculationResult: 'Your Merkle leaf calculation result:',
		locateLeaf: 'Locate your Merkle leaf in the Merkle tree:',
		merkleTitle: 'Merkle Tree',
		merkleIntro:
			'In a Proof of Reserves scenario, a Merkle tree is used to verify the exchange total reserves, ensuring they can cover all user assets while protecting user privacy. Each hashed user UID and balance is combined into the underlying data blocks, and all user data is used to generate the Merkle tree. Any change to an account ID or balance in a leaf node changes the Merkle root. Every user can verify whether their assets are included in a leaf node.',
		merkleAria: 'Merkle tree structure diagram',
		customerSupport: 'What is a Merkle tree',
		listingSupport: 'Official Website',
		wealthSupport: 'Customer Support Email',
		partnerships: 'Media Contact',
		noWallet: 'No wallet extension detected. Please authorize from a wallet app.',
		connectFirst: 'Please connect your wallet first.',
		loginFailed: 'Wallet login failed',
		authFailed: 'Wallet authorization failed',
		verifySuccess: 'Verification passed',
		verifyFailed: 'Verification failed'
	},
	zh: {
		pageTitle: '以太坊服务平台储备证明（PoR）',
		back: '返回',
		connectTitle: '连接钱包',
		connectIntro: '授权钱包地址后进入默克尔树验证器。',
		connectButton: '连接钱包',
		connectHint: '授权钱包地址后才会生成默克尔叶，并启用提交验证。',
		validatorTitle: '默克尔树验证器',
		proofReady: '证明就绪',
		proofPending: '等待钱包授权',
		validatorIntro:
			'输入您的默克尔叶，即可查询您的账户资产是否与默克尔树中的一致。若验证通过且余额准确，说明您的资产被包含在默克尔树，且得到安全保障',
		walletAddress: '钱包地址',
		logout: '退出',
		auditId: '审计ID',
		auditPlaceholder: '请选择审计ID',
		merkleLeaf: '默克尔叶',
		submit: '提交',
		assetBalance: '您托管储备金',
		platformReserves: '平台资产储备',
		reserveActions: '储备金详情',
		reserveActionIntro: '查看平台储备金率，或查看当前钱包用户的托管储备金。',
		platformReserveButton: '平台储备金',
		custodyReserveButton: '您托管储备金',
		reserveIntro:
			'您可以对比平台钱包资产与用户资产，计算平台的储备金率。储备金率 >=100% 时，代表平台的资金充足。',
		snapshotTime: '快照时间：',
		asset: '资产',
		amount: '数量',
		reserveRate: '储备金率',
		userAssets: '用户资产',
		walletAssets: '钱包资产',
		reserveSufficient: '储备充足',
		reserveInsufficient: '储备不足',
		verificationPassed: '验证通过',
		calculationResult: '您的默克尔叶计算结果：',
		locateLeaf: '在默克尔树中定位您的默克尔叶:',
		merkleTitle: '默克尔树',
		merkleIntro:
			'在储备金证明的场景中，默克尔树用于验证交易所的总储备金，确保其能够覆盖所有用户的资产，同时保护用户隐私。以每个哈希后的用户UID和余额联结形成底层数据块，最终以所有用户数据生成默克尔树。叶节点中的任意账户ID或余额变动，都会引起默克尔根产生变化。每个用户都可以验证自己的资产是否被包含在叶节点中。',
		merkleAria: '默克尔树结构示意图',
		customerSupport: '默克尔树是什么',
		listingSupport: '官方网站',
		wealthSupport: '客户支持邮箱',
		partnerships: '媒体联系',
		noWallet: '未检测到钱包插件，请通过钱包应用授权',
		connectFirst: '请先连接钱包',
		loginFailed: '钱包登录失败',
		authFailed: '钱包授权失败',
		verifySuccess: '验证成功',
		verifyFailed: '验证失败'
	}
} as const;

type LocaleKey = keyof (typeof localeText)['en'];

const { router, service } = useCool();

const loading = ref(false);
let loginRequestId = 0;
const audits = ref<AuditOption[]>([]);
const result = ref<VerifyResult | null>(null);
const pageRef = ref<HTMLElement | null>(null);
const platformReserveVisible = ref(false);
const custodyReserveVisible = ref(false);
const footerConfig = ref<FooterConfig>({
	customerSupportEmail: 'https://en.wikipedia.org/wiki/Merkle_tree',
	listingSupportEmail: 'https://ethereum.org',
	wealthEmail: 'customerservice@ethereumalliance.us',
	partnershipsEmail: 'PressContact@ethereumalliance.us',
	language: 'en'
});

const wallet = reactive({
	walletAddress: '',
	merkleLeaf: '',
	eth: '0',
	usdc: '0',
	usdt: '0'
});

const form = reactive({
	auditId: '',
	merkleLeaf: ''
});

const step = computed(() => {
	return result.value ? 'result' : 'verify';
});

const isWalletReady = computed(() => Boolean(wallet.walletAddress && form.merkleLeaf));

const reserveAssets = computed(() => {
	const reserve = result.value?.reserve || {};
	const assets = [
		{
			name: 'ETH',
			rate: reserve.ethReserveRate,
			platformAsset: reserve.ethPlatformAsset,
			userAsset: reserve.ethUserAsset,
			className: 'eth'
		},
		{
			name: 'USDC',
			rate: reserve.usdcReserveRate,
			platformAsset: reserve.usdcPlatformAsset,
			userAsset: reserve.usdcUserAsset,
			className: 'usdc'
		},
		{
			name: 'USDT',
			rate: reserve.usdtReserveRate,
			platformAsset: reserve.usdtPlatformAsset,
			userAsset: reserve.usdtUserAsset,
			className: 'usdt'
		}
	];

	return assets.map(asset => {
		const rateNumber = Number(asset.rate || 0);
		const sufficient = rateNumber >= 100;
		return {
			...asset,
			rate: displayRate(asset.rate),
			platformAsset: displayAmount(asset.platformAsset),
			userAsset: displayAmount(asset.userAsset),
			sufficient,
			statusText: sufficient ? t('reserveSufficient') : t('reserveInsufficient')
		};
	});
});

const custodyAssets = computed(() => {
	const source = result.value?.wallet || wallet;
	return [
		{
			name: 'ETH',
			amount: displayAmount(source.eth),
			className: 'eth'
		},
		{
			name: 'USDT',
			amount: displayAmount(source.usdt),
			className: 'usdt'
		},
		{
			name: 'USDC',
			amount: displayAmount(source.usdc),
			className: 'usdc'
		}
	];
});

const snapshotTimeText = computed(() => {
	const value = result.value?.audit?.snapshotTime || audits.value.find(e => e.auditId === form.auditId)?.snapshotTime || '';
	const parsed = dayjs(value);
	return parsed.isValid() ? parsed.format('YYYY/MM/DD HH:mm:ss') : value.replace(/-/g, '/');
});

const resultMerkleLeaf = computed(() => {
	return result.value?.merkleLeafResult || result.value?.merkleLeaf || form.merkleLeaf;
});

const merkleLevelText = computed(() => {
	return result.value?.merkleLeafLevel?.trim() || 'Level 23';
});

const walletAddressText = computed(() => {
	const address = wallet.walletAddress.trim();
	if (!address) {
		return '';
	}
	return address.length > 24 ? `${address.slice(0, 10)}...${address.slice(-8)}` : address;
});

const language = computed<Language>(() => {
	return footerConfig.value.language === 'zh' ? 'zh' : 'en';
});

const contacts = computed(() => {
	const items = [
		{
			label: t('customerSupport'),
			value: footerConfig.value.customerSupportEmail,
			type: 'url'
		},
		{
			label: t('listingSupport'),
			value: footerConfig.value.listingSupportEmail,
			type: 'url'
		},
		{
			label: t('wealthSupport'),
			value: footerConfig.value.wealthEmail,
			type: 'email'
		},
		{
			label: t('partnerships'),
			value: footerConfig.value.partnershipsEmail,
			type: 'email'
		}
	];

	return items.map(item => {
		const value = item.value.trim();
		const href =
			item.type === 'email'
				? `mailto:${value}`
				: value.startsWith('http')
					? value
					: `https://${value}`;
		return {
			...item,
			value: item.type === 'url' ? value.replace(/^https?:\/\//, '') : value,
			href,
			target: item.type === 'url' ? '_blank' : undefined,
			rel: item.type === 'url' ? 'noopener noreferrer' : undefined
		};
	});
});

function t(key: LocaleKey) {
	return localeText[language.value][key];
}

function getSafeBackPath() {
	const backPath = history.state?.back;
	if (typeof backPath !== 'string' || !backPath.startsWith('/')) {
		return '';
	}
	if (backPath === router.currentRoute.value.fullPath) {
		return '';
	}
	return backPath;
}

function goBack() {
	if (step.value === 'result') {
		result.value = null;
		nextTick(scrollPageToTop);
		return;
	}

	if (wallet.walletAddress) {
		logoutWallet();
		nextTick(scrollPageToTop);
		return;
	}

	if (getSafeBackPath()) {
		router.back();
		return;
	}

	router.replace('/por/verify');
}

function displayAmount(value?: string) {
	return value || '0';
}

function displayRate(value?: string) {
	if (!value) {
		return '0%';
	}
	return value.includes('%') ? value : `${value}%`;
}

function scrollPageToTop() {
	const el = pageRef.value;
	if (el) {
		el.scrollTo({ top: 0, behavior: 'smooth' });
		return;
	}
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function request<T>(url: string, data?: any, method: 'GET' | 'POST' = 'POST') {
	return service.request({
		url,
		method,
		data,
		params: method === 'GET' ? data : undefined,
		headers: {
			Authorization: null
		}
	}) as Promise<T>;
}

async function loadAudits() {
	audits.value = await request<AuditOption[]>('app/por/audit/options', undefined, 'GET');
	if (!form.auditId && audits.value[0]) {
		form.auditId = audits.value[0].auditId;
	}
}

async function loadFooterConfig() {
	try {
		footerConfig.value = await request<FooterConfig>('app/por/footer/config', undefined, 'GET');
	} catch {
		// 保留本地默认值，避免配置接口异常时成功页底部空白。
	}
}

function setWallet(data: WalletData) {
	wallet.walletAddress = data.walletAddress;
	wallet.merkleLeaf = data.merkleLeaf;
	wallet.eth = displayAmount(data.eth);
	wallet.usdc = displayAmount(data.usdc);
	wallet.usdt = displayAmount(data.usdt);
	form.merkleLeaf = data.merkleLeaf;
}

async function login(walletAddress: string) {
	const requestId = ++loginRequestId;
	loading.value = true;
	try {
		const res = await request<WalletData>('app/por/wallet/login', {
			walletAddress
		});
		if (requestId !== loginRequestId) {
			return;
		}
		setWallet(res);
		result.value = null;
		await loadAudits();
	} catch (err: any) {
		if (requestId === loginRequestId) {
			ElMessage.error(err.message || t('loginFailed'));
		}
	} finally {
		if (requestId === loginRequestId) {
			loading.value = false;
		}
	}
}

async function connectWallet() {
	if (!window.ethereum) {
		ElMessage.warning(t('noWallet'));
		return;
	}
	try {
		const accounts = await window.ethereum.request<string[]>({
			method: 'eth_requestAccounts'
		});
		if (accounts?.[0]) {
			await login(accounts[0]);
		}
	} catch (err: any) {
		ElMessage.error(err.message || t('authFailed'));
	}
}

function logoutWallet() {
	loginRequestId += 1;
	wallet.walletAddress = '';
	wallet.merkleLeaf = '';
	wallet.eth = '0';
	wallet.usdc = '0';
	wallet.usdt = '0';
	form.merkleLeaf = '';
	result.value = null;
	platformReserveVisible.value = false;
	custodyReserveVisible.value = false;
	localStorage.removeItem('por-wallet-address');
}

function handleAccountsChanged(accounts: string[]) {
	const nextAddress = accounts?.[0] || '';
	if (!nextAddress) {
		logoutWallet();
		return;
	}
	if (nextAddress.toLowerCase() === wallet.walletAddress.toLowerCase()) {
		return;
	}
	login(nextAddress);
}

async function submit() {
	if (!isWalletReady.value) {
		ElMessage.warning(t('connectFirst'));
		return;
	}

	loading.value = true;
	try {
		result.value = await request<VerifyResult>('app/por/verify/submit', {
			walletAddress: wallet.walletAddress,
			auditId: form.auditId,
			merkleLeaf: form.merkleLeaf
		});
		if (result.value.wallet) {
			setWallet(result.value.wallet);
		}
		ElMessage.success(language.value === 'en' ? t('verifySuccess') : result.value.message || t('verifySuccess'));
		await nextTick();
		scrollPageToTop();
	} catch (err: any) {
		ElMessage.error(err.message || t('verifyFailed'));
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	window.ethereum?.on?.('accountsChanged', handleAccountsChanged);
	await loadFooterConfig();
	localStorage.removeItem('por-wallet-address');
	await loadAudits();
});

onBeforeUnmount(() => {
	window.ethereum?.removeListener?.('accountsChanged', handleAccountsChanged);
});
</script>

<style lang="scss" scoped>
.por-verify-page {
	--eth-ink: #121212;
	--eth-text: #303238;
	--eth-muted: #616161;
	--eth-soft: #f7f7fb;
	--eth-surface: #fff;
	--eth-border: #cfcfcf;
	--eth-line: #e8e7ef;
	--eth-purple: #6c24e0;
	--eth-purple-dark: #5520b8;
	--eth-purple-soft: #f3efff;
	--eth-blue: #627eea;
	--success: #11906b;
	--success-soft: #eefbf6;
	height: 100vh;
	min-height: 100vh;
	overflow-y: auto;
	overscroll-behavior: contain;
	-webkit-overflow-scrolling: touch;
	background:
		linear-gradient(180deg, #fff 0%, var(--eth-soft) 56%, #f1f0fb 100%);
	color: var(--eth-text);
	font-family:
		Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

@keyframes porSurfaceIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes porPanelIn {
	from {
		opacity: 0;
		transform: translateY(6px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes porStatusPulse {
	0% {
		box-shadow: 0 0 0 0 rgb(141 145 156 / 24%);
	}

	70% {
		box-shadow: 0 0 0 7px rgb(141 145 156 / 0%);
	}

	100% {
		box-shadow: 0 0 0 0 rgb(141 145 156 / 0%);
	}
}

@keyframes porReadyPulse {
	0% {
		box-shadow: 0 0 0 0 rgb(108 36 224 / 24%);
	}

	100% {
		box-shadow: 0 0 0 7px rgb(108 36 224 / 0%);
	}
}

@keyframes porCheckPop {
	0% {
		opacity: 0;
		transform: scale(0.88);
	}

	58% {
		opacity: 1;
		transform: scale(1.08);
	}

	100% {
		opacity: 1;
		transform: scale(1);
	}
}

.topbar {
	height: 64px;
	background: rgb(255 255 255 / 94%);
	color: var(--eth-ink);
	display: grid;
	grid-template-columns: 48px 1fr 48px;
	align-items: center;
	position: sticky;
	top: 0;
	z-index: 10;
	border-bottom: 1px solid var(--eth-border);
	backdrop-filter: saturate(140%) blur(8px);

	.back {
		justify-self: start;
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		border: 0;
		background: transparent;
		color: var(--eth-ink);
		font-size: 22px;
		cursor: pointer;
		transition: background-color 180ms ease, color 180ms ease;

		&:hover {
			background: var(--eth-purple-soft);
			color: var(--eth-purple);
		}

		&:focus-visible {
			outline: 2px solid var(--eth-purple);
			outline-offset: 2px;
			border-radius: 8px;
		}
	}

	.title {
		text-align: center;
		font-size: 16px;
		font-weight: 650;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}

.content {
	padding: 32px 18px 48px;

	&.is-result {
		padding: 0 22px 46px;
		background: transparent;
	}
}

.verify-card {
	width: min(520px, 100%);
	margin: 0 auto;
	background: var(--eth-surface);
	border-radius: 8px;
	padding: 34px 28px;
	box-sizing: border-box;
	border: 1px solid var(--eth-border);
	box-shadow: 0 2px 8px rgb(18 18 18 / 4%);
	animation: porSurfaceIn 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.illustration {
	width: 112px;
	height: 108px;
	margin: 0 auto 18px;
	position: relative;

	.doc {
		width: 78px;
		height: 86px;
		border-radius: 8px;
		background: linear-gradient(180deg, #fff 0%, #eef0ff 100%);
		border: 1px solid #cacdf7;
		display: grid;
		place-items: center;
		margin: 0 auto;
		box-shadow: 10px 10px 0 #d9efff;
		font-size: 38px;
		color: var(--eth-purple);
	}

	.bubble {
		position: absolute;
		left: 10px;
		bottom: 8px;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--eth-purple);
		border: 4px solid #fff;
		color: #fff;
		display: grid;
		place-items: center;
		font-weight: 900;
		letter-spacing: 2px;
		box-shadow: 0 2px 8px rgb(108 36 224 / 18%);
	}
}

.verify-card {
	position: relative;

	h1 {
		text-align: center;
		color: var(--eth-ink);
		font-size: 30px;
		line-height: 1.22;
		margin: 0;
		font-weight: 900;
		text-wrap: balance;
	}

	.intro {
		max-width: 430px;
		margin: 18px auto 22px;
		text-align: center;
		color: var(--eth-muted);
		font-size: 16px;
		line-height: 1.75;
	}
}

.verify-heading {
	display: grid;
	gap: 12px;
	justify-items: center;
}

.status-pill {
	min-height: 30px;
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 0 13px;
	border: 1px solid var(--eth-line);
	border-radius: 999px;
	background: #fbfbff;
	color: #50535e;
	font-size: 14px;
	font-weight: 800;

	span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #8d919c;
		box-shadow: 0 0 0 4px rgb(141 145 156 / 14%);
	}

	&.pending span {
		animation: porStatusPulse 1600ms ease-out infinite;
	}

	&.ready {
		border-color: #d8cff6;
		background: var(--eth-purple-soft);
		color: var(--eth-purple-dark);

		span {
			background: var(--eth-purple);
			box-shadow: 0 0 0 4px rgb(108 36 224 / 14%);
			animation: porReadyPulse 650ms ease-out 1;
		}
	}
}

.wallet-auth-panel {
	display: grid;
	gap: 14px;
	margin: 0 0 22px;
	padding: 16px;
	border: 1px solid var(--eth-line);
	border-radius: 8px;
	background: #fbfbff;
	animation: porPanelIn 220ms cubic-bezier(0.22, 1, 0.36, 1);

	p {
		margin: 0;
		color: #4d5059;
		font-size: 14px;
		line-height: 1.55;
		font-weight: 650;
		text-align: center;
	}
}

.connect-action {
	height: 50px;
	border-radius: 8px;
	background: var(--eth-purple);
	border-color: var(--eth-purple);
	color: #fff;
	font-size: 16px;
	font-weight: 800;
	transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;

	&:hover,
	&:focus {
		background: var(--eth-purple-dark);
		border-color: var(--eth-purple-dark);
		color: #fff;
	}

	&:hover:not(.is-loading) {
		transform: translateY(-1px);
	}

	&:focus-visible {
		outline: 2px solid var(--eth-purple);
		outline-offset: 2px;
	}

	&:active {
		transform: translateY(1px);
	}
}

.wallet-strip {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: center;
	gap: 12px;
	margin: 0 0 26px;
	padding: 12px 14px;
	border-radius: 8px;
	background: #f8f8ff;
	border: 1px solid var(--eth-line);
	animation: porPanelIn 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.wallet-info {
	min-width: 0;
	display: grid;
	gap: 4px;

	span {
		color: var(--eth-muted);
		font-size: 14px;
		font-weight: 700;
	}

	strong {
		min-width: 0;
		color: var(--eth-ink);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
		font-size: 14px;
		font-weight: 800;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

.logout-button {
	height: 36px;
	padding: 0 12px;
	border-radius: 8px;
	border-color: var(--eth-border);
	background: #fff;
	color: #4f5360;
	font-weight: 750;
	transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;

	&:hover,
	&:focus {
		background: var(--eth-purple-soft);
		border-color: #c6b7f5;
		color: var(--eth-purple-dark);
	}

	&:active {
		transform: translateY(1px);
	}
}

.form {
	display: grid;
	gap: 12px;

	label {
		font-size: 16px;
		font-weight: 750;
		color: var(--eth-ink);

		span {
			color: #d73a2f;
		}
	}

	.field {
		margin-bottom: 12px;

		:deep(.el-input__wrapper),
		:deep(.el-select__wrapper) {
			min-height: 54px;
			border-radius: 8px;
			font-size: 15px;
			box-shadow: 0 0 0 1px var(--eth-border) inset;

			&.is-focus,
			&:focus-within {
				box-shadow: 0 0 0 1px var(--eth-purple) inset, 0 0 0 3px rgb(108 36 224 / 12%);
			}
		}
	}
}

.leaf-field {
	animation: porPanelIn 220ms cubic-bezier(0.22, 1, 0.36, 1);

	:deep(.el-textarea__inner) {
		min-height: 76px !important;
		padding: 13px 14px;
		border-radius: 8px;
		border: 0;
		box-shadow: 0 0 0 1px var(--eth-border) inset;
		color: var(--eth-text);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
		font-size: 14px;
		line-height: 1.55;
		word-break: break-all;

		&:focus {
			box-shadow: 0 0 0 1px var(--eth-purple) inset, 0 0 0 3px rgb(108 36 224 / 12%);
		}
	}
}

.submit {
	height: 58px;
	margin-top: 6px;
	border-radius: 8px;
	background: var(--eth-purple);
	border-color: var(--eth-purple);
	color: #fff;
	font-size: 18px;
	font-weight: 800;
	transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;

	&:hover,
	&:focus {
		background: var(--eth-purple-dark);
		border-color: var(--eth-purple-dark);
		color: #fff;
	}

	&:hover:not(.is-disabled):not(.is-loading) {
		transform: translateY(-1px);
	}

	&:focus-visible {
		outline: 2px solid var(--eth-purple);
		outline-offset: 2px;
	}

	&:active {
		transform: translateY(1px);
	}

	&.is-disabled,
	&.is-disabled:hover,
	&.is-disabled:focus,
	&.is-loading {
		background: #f3f3f7;
		border-color: var(--eth-border);
		color: #858995;
		transform: none;
	}
}

.result-shell {
	position: relative;
	isolation: isolate;
	width: min(540px, 100%);
	min-height: calc(100vh - 64px);
	margin: 0 auto;
	padding: 72px 28px 54px;
	overflow: hidden;
	background:
		linear-gradient(180deg, rgb(247 248 255 / 96%) 0, #fff 210px, var(--eth-surface) 100%);
	box-sizing: border-box;
	border-inline: 1px solid rgb(207 207 207 / 45%);

	> :not(.eth-ecosystem-bg) {
		position: relative;
		z-index: 1;
	}
}

.eth-ecosystem-bg {
	position: absolute;
	z-index: 0;
	top: 0;
	left: 0;
	right: 0;
	height: 210px;
	overflow: hidden;
	pointer-events: none;
	background:
		radial-gradient(circle at 18% 22%, rgb(98 126 234 / 13%) 0 56px, transparent 57px),
		radial-gradient(circle at 84% 18%, rgb(108 36 224 / 12%) 0 72px, transparent 73px),
		linear-gradient(135deg, #fbfcff 0%, #f1f3ff 52%, #f8fbff 100%);
	border-bottom: 1px solid rgb(214 218 245 / 72%);

	&::before {
		content: '';
		position: absolute;
		inset: 14px 18px auto;
		height: 150px;
		border: 1px solid rgb(98 126 234 / 10%);
		border-radius: 8px;
		background:
			linear-gradient(90deg, rgb(98 126 234 / 5%) 1px, transparent 1px),
			linear-gradient(180deg, rgb(98 126 234 / 5%) 1px, transparent 1px);
		background-size: 34px 34px;
		mask-image: linear-gradient(180deg, #000 0%, rgb(0 0 0 / 56%) 62%, transparent 100%);
	}
}

.eth-watermark {
	position: absolute;
	right: 30px;
	top: 24px;
	width: 112px;
	height: 112px;
	display: grid;
	place-items: center;
	opacity: 0.22;
	transform: rotate(-8deg);
	filter: drop-shadow(0 12px 18px rgb(98 126 234 / 20%));

	.eth-glyph {
		transform: scale(4.1);

		&::before {
			border-bottom-color: #627eea;
		}

		i {
			border-top-color: #8a92d4;
		}

		&::after {
			border-bottom-color: #3f4c85;
		}
	}
}

.ecosystem-line,
.ecosystem-node {
	position: absolute;
	z-index: 1;
}

.ecosystem-line {
	height: 1px;
	border-radius: 999px;
	background: linear-gradient(90deg, transparent, rgb(98 126 234 / 36%), transparent);
	transform-origin: left center;
}

.line-a {
	top: 68px;
	left: 42px;
	width: 210px;
	transform: rotate(11deg);
}

.line-b {
	top: 128px;
	left: 76px;
	width: 260px;
	transform: rotate(-8deg);
}

.line-c {
	top: 38px;
	left: 218px;
	width: 196px;
	transform: rotate(21deg);
}

.ecosystem-node {
	width: 9px;
	height: 9px;
	border-radius: 50%;
	background: #fff;
	border: 1px solid rgb(98 126 234 / 55%);
	box-shadow: 0 0 0 5px rgb(98 126 234 / 8%), 0 4px 10px rgb(18 18 18 / 8%);
}

.node-a {
	top: 62px;
	left: 54px;
}

.node-b {
	top: 116px;
	left: 154px;
}

.node-c {
	top: 58px;
	left: 296px;
}

.node-d {
	top: 132px;
	right: 72px;
}

.reserve-section {
	h1 {
		margin: 0 0 18px;
		font-size: 34px;
		line-height: 1.12;
		font-weight: 900;
		color: var(--eth-ink);
		text-wrap: balance;
	}

	> p {
		margin: 0;
		color: var(--eth-muted);
		font-size: 17px;
		line-height: 1.55;
		font-weight: 600;
	}
}

.reserve-intro {
	margin-top: 18px !important;
	padding: 14px 16px;
	border: 1px solid var(--eth-line);
	border-radius: 8px;
	background: #fafaff;
	color: #3f4148 !important;
	font-size: 15px !important;
	line-height: 1.65 !important;
	font-weight: 600 !important;
}

.reserve-list {
	display: grid;
	gap: 16px;
	margin-top: 26px;
}

.reserve-card {
	padding: 24px 24px 22px;
	border: 1px solid var(--eth-border);
	border-radius: 8px;
	background: linear-gradient(180deg, #fff 0%, #fbfbff 100%);
	transition: border-color 180ms ease, transform 180ms ease;

	&:hover {
		border-color: #a99bf0;
		transform: translateY(-1px);
	}
}

.reserve-top {
	display: flex;
	align-items: center;
	gap: 18px;
}

.reserve-summary {
	min-width: 0;

	p {
		margin: 0 0 5px;
		color: #52545c;
		font-size: 16px;
		line-height: 1.25;
		font-weight: 650;
	}

	div {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 18px;
	}

	strong {
		color: var(--eth-ink);
		font-size: 30px;
		line-height: 1.1;
		font-weight: 800;
	}

	span {
		color: var(--success);
		font-size: 16px;
		font-weight: 700;

		&.warning {
			color: #c2410c;
		}
	}
}

.reserve-divider {
	height: 1px;
	margin: 22px 0 16px;
	background: var(--eth-line);
}

.reserve-meta {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: center;
	gap: 16px;
	padding: 7px 0;

	span {
		color: #6f7178;
		font-size: 16px;
		font-weight: 650;
	}

	strong {
		color: var(--eth-ink);
		font-size: 16px;
		font-weight: 850;
		text-align: right;
		word-break: break-word;
	}
}

.asset-icon {
	width: 52px;
	height: 52px;
	flex: 0 0 52px;
	border-radius: 50%;
	display: grid;
	place-items: center;
	line-height: 1;
	box-shadow: inset 0 0 0 1px rgb(255 255 255 / 36%), 0 2px 6px rgb(18 18 18 / 10%);

	&.eth {
		background: #eef0ff;
		border: 1px solid #d7dcff;
	}

	&.usdt {
		background: #26a17b;
	}

	&.usdc {
		background: #2775ca;
	}
}

.reserve-icon {
	.eth-glyph {
		transform: scale(1.28);
	}

	.usdt-glyph,
	.usdc-glyph {
		transform: scale(1.2);
	}
}

.eth-glyph {
	width: 17px;
	height: 22px;
	display: grid;
	place-items: center;
	position: relative;

	i,
	&::before,
	&::after {
		content: '';
		display: block;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
	}

	&::before {
		top: 0;
		border-bottom: 12px solid #343a40;
	}

	i {
		top: 12px;
		border-top: 9px solid #8a92b2;
	}

	&::after {
		top: 8px;
		border-bottom: 5px solid #627eea;
		opacity: 0.9;
	}
}

.usdt-glyph,
.usdc-glyph {
	width: 22px;
	height: 22px;
	border-radius: 50%;
	display: grid;
	place-items: center;
	color: #fff;
	font-weight: 900;
}

.usdt-glyph {
	position: relative;
	font-size: 15px;

	&::before {
		content: '';
		position: absolute;
		top: 6px;
		left: 4px;
		right: 4px;
		height: 2px;
		border-radius: 999px;
		background: #fff;
	}

	span {
		transform: translateY(1px);
	}
}

.usdc-glyph {
	border: 2px solid rgb(255 255 255 / 88%);
	font-size: 14px;

	span {
		transform: translateY(-0.5px);
	}
}

.pass-card {
	margin-top: 0;
	padding: 30px 30px 28px;
	border-radius: 8px;
	background: var(--success-soft);
	border: 1px solid #bfe8d7;
	animation: porSurfaceIn 240ms cubic-bezier(0.22, 1, 0.36, 1);

	h2 {
		margin: 0;
		color: var(--success);
		font-size: 28px;
		line-height: 1.2;
		font-weight: 900;
	}

	p {
		margin: 0 0 8px;
		color: #3f4946;
		font-size: 15px;
		font-weight: 650;
	}

	.hash,
	.level {
		display: block;
		color: var(--eth-ink);
		font-size: 14px;
		line-height: 1.6;
		font-weight: 800;
		word-break: break-all;
	}

	.hash {
		padding: 12px 14px;
		border-radius: 8px;
		background: #fff;
		border: 1px solid #cfebe0;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
	}
}

.reserve-actions {
	display: grid;
	gap: 18px;
	margin-top: 24px;
	padding: 22px;
	border: 1px solid var(--eth-border);
	border-radius: 8px;
	background: linear-gradient(180deg, #fff 0%, #fbfbff 100%);
	animation: porPanelIn 240ms cubic-bezier(0.22, 1, 0.36, 1);

	h3 {
		margin: 0 0 8px;
		color: var(--eth-ink);
		font-size: 20px;
		line-height: 1.25;
		font-weight: 900;
	}

	p {
		margin: 0;
		color: var(--eth-muted);
		font-size: 15px;
		line-height: 1.6;
		font-weight: 600;
	}
}

.reserve-action-buttons {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;

	:deep(.el-button + .el-button) {
		margin-left: 0;
	}
}

.reserve-action {
	min-height: 48px;
	margin: 0;
	border-radius: 8px;
	font-size: 15px;
	font-weight: 800;
	transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;

	&:active {
		transform: translateY(1px);
	}
}

.primary-action {
	background: var(--eth-purple);
	border-color: var(--eth-purple);
	color: #fff;

	&:hover,
	&:focus {
		background: var(--eth-purple-dark);
		border-color: var(--eth-purple-dark);
		color: #fff;
	}
}

.secondary-action {
	background: #fff;
	border-color: var(--eth-border);
	color: var(--eth-purple);

	&:hover,
	&:focus {
		background: var(--eth-purple-soft);
		border-color: #b8a8ee;
		color: var(--eth-purple-dark);
	}
}

.pass-head {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 28px;
}

.pass-icon {
	width: 32px;
	height: 32px;
	flex: 0 0 32px;
	display: grid;
	place-items: center;
	border-radius: 50%;
	background: #d8f4e8;
	color: var(--success);
	font-size: 18px;
	animation: porCheckPop 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.proof-block {
	display: grid;
	gap: 8px;

	& + & {
		margin-top: 20px;
	}
}

.dialog-section {
	> p {
		font-size: 13px;
		line-height: 1.35;
	}

	.reserve-intro {
		margin-top: 9px !important;
		padding: 8px 10px;
		font-size: 12px !important;
		line-height: 1.45 !important;
	}

	.reserve-list {
		gap: 8px;
		margin-top: 10px;
	}

	.reserve-card {
		padding: 10px 12px;
	}

	.reserve-top {
		gap: 10px;
	}

	.asset-icon {
		width: 32px;
		height: 32px;
		flex-basis: 32px;
	}

	.reserve-icon {
		.eth-glyph {
			transform: scale(0.92);
		}

		.usdt-glyph,
		.usdc-glyph {
			transform: scale(0.9);
		}
	}

	.reserve-summary {
		p {
			margin-bottom: 1px;
			font-size: 12px;
		}

		div {
			gap: 8px;
		}

		strong {
			font-size: 20px;
		}

		span {
			font-size: 12px;
		}
	}

	.reserve-divider {
		margin: 8px 0 5px;
	}

	.reserve-meta {
		gap: 10px;
		padding: 2px 0;

		span,
		strong {
			font-size: 12px;
		}
	}
}

.custody-section {
	display: grid;
	gap: 10px;
}

.dialog-time {
	margin: 0;
	color: var(--eth-muted);
	font-size: 13px;
	line-height: 1.35;
	font-weight: 650;
}

.balance-table {
	display: grid;
	gap: 8px;
	border-top: 0;
	padding-top: 0;
}

.balance-head,
.balance-row {
	display: grid;
	grid-template-columns: minmax(96px, auto) minmax(0, 1fr);
	align-items: center;
	gap: 10px;
}

.balance-head {
	padding: 0 2px 0;
	color: #6f7178;
	font-size: 12px;
	font-weight: 850;
}

.balance-row {
	min-height: 54px;
	padding: 10px 12px;
	border: 1px solid var(--eth-border);
	border-radius: 8px;
	background: linear-gradient(180deg, #fff 0%, #fbfbff 100%);
	animation: porPanelIn 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.balance-asset {
	display: flex;
	align-items: center;
	gap: 10px;
	min-width: 0;

	.asset-icon {
		width: 32px;
		height: 32px;
		flex-basis: 32px;
	}

	strong {
		color: var(--eth-ink);
		font-size: 14px;
		line-height: 1.15;
		font-weight: 900;
	}
}

.balance-amount {
	min-width: 0;
	max-width: 100%;
	justify-self: end;
	color: var(--eth-ink);
	font-size: 20px;
	line-height: 1.15;
	font-weight: 850;
	text-align: right;
	letter-spacing: 0;
	font-variant-numeric: tabular-nums;
	overflow-wrap: anywhere;
	word-break: normal;
}

.merkle-card {
	margin-top: 44px;
	padding: 34px 2px 8px;
	text-align: center;
	border-top: 1px solid var(--eth-line);
	animation: porPanelIn 260ms cubic-bezier(0.22, 1, 0.36, 1);

	h2 {
		margin: 0 0 22px;
		color: var(--eth-ink);
		font-size: 28px;
		line-height: 1.25;
		font-weight: 900;
	}

	p {
		margin: 0;
		color: var(--eth-muted);
		font-size: 17px;
		line-height: 1.75;
		font-weight: 600;
		text-align: center;
		text-wrap: pretty;
	}
}

.merkle-tree {
	display: grid;
	gap: 8px;
	margin-top: 30px;
}

.tree-row,
.tree-arrows {
	display: grid;
	align-items: center;
	gap: 12px;
}

.root-row {
	grid-template-columns: 1fr;
	padding: 0 42px;
}

.branch-row,
.two-arrows {
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.leaf-row,
.four-arrows {
	grid-template-columns: repeat(4, minmax(0, 1fr));
}

.tree-node {
	min-width: 0;
	height: 44px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f0f0f6;
	color: #555866;
	font-size: 15px;
	font-weight: 700;
	white-space: nowrap;
}

.root-node {
	background: var(--eth-purple);
	color: #fff;
}

.tree-arrows {
	height: 22px;
	color: #9aa1c0;
	font-size: 21px;
	line-height: 1;
}

.result-footer {
	margin: 38px -4px 0;
	padding: 24px 0 8px;
	border-top: 1px solid var(--eth-line);
	animation: porPanelIn 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.contact-list {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 10px;
}

.contact-item {
	min-width: 0;
	display: grid;
	gap: 5px;
	padding: 12px 14px;
	border: 1px solid var(--eth-line);
	border-radius: 8px;
	background: linear-gradient(180deg, #fff 0%, #fbfbff 100%);
	text-decoration: none;
	transition: border-color 180ms ease, background-color 180ms ease, transform 180ms ease;

	&:hover {
		border-color: #c9bdf4;
		background: #f9f7ff;
	}

	&:focus-visible {
		outline: 2px solid var(--eth-purple);
		outline-offset: 2px;
	}

	&:active {
		transform: translateY(1px);
	}
}

.contact-label {
	min-width: 0;
	color: #5f6370;
	font-size: 12px;
	line-height: 1.2;
	font-weight: 850;
}

.contact-value {
	min-width: 0;
	color: var(--eth-purple);
	font-size: 14px;
	line-height: 1.35;
	font-weight: 750;
	overflow-wrap: anywhere;
	word-break: break-word;
}

@media (max-width: 520px) {
	.content {
		padding: 24px 24px 36px;
	}

	.verify-card {
		padding: 30px 22px;
	}

	.verify-card {
		h1 {
			font-size: 27px;
		}

		.intro {
			font-size: 15px;
			line-height: 1.7;
		}
	}

	.wallet-strip {
		grid-template-columns: 1fr;
		align-items: stretch;
		gap: 6px;
	}

	.logout-button {
		justify-self: start;
	}

	.leaf-field {
		:deep(.el-textarea__inner) {
			min-height: 82px !important;
			font-size: 14px;
		}
	}

	.result-shell {
		padding: 62px 24px 46px;
		border-inline: 0;
	}

	.eth-ecosystem-bg {
		height: 188px;

		&::before {
			inset: 12px 14px auto;
			height: 132px;
			background-size: 28px 28px;
		}
	}

	.eth-watermark {
		right: 12px;
		top: 22px;
		width: 88px;
		height: 88px;
		opacity: 0.18;

		.eth-glyph {
			transform: scale(3.2);
		}
	}

	.line-a {
		left: 28px;
		width: 168px;
	}

	.line-b {
		left: 48px;
		width: 210px;
	}

	.line-c {
		left: 156px;
		width: 142px;
	}

	.node-c {
		left: 242px;
	}

	.node-d {
		right: 34px;
	}

	.reserve-actions {
		padding: 20px;
	}

	.reserve-action-buttons {
		grid-template-columns: 1fr;
	}

	.reserve-section {
		h1 {
			font-size: 31px;
		}

		> p {
			font-size: 16px;
		}
	}

	.reserve-list {
		gap: 16px;
		margin-top: 24px;
	}

	.reserve-card {
		padding: 22px 20px 20px;
	}

	.reserve-top {
		gap: 15px;
	}

	.asset-icon {
		width: 48px;
		height: 48px;
		flex-basis: 48px;
	}

	.reserve-summary {
		p {
			font-size: 15px;
		}

		strong {
			font-size: 27px;
		}

		span {
			font-size: 15px;
		}
	}

	.reserve-meta {
		span,
		strong {
			font-size: 15px;
		}
	}

	.pass-card {
		padding: 28px 22px 26px;

		h2 {
			font-size: 26px;
		}

		.hash,
		.level {
			font-size: 13px;
		}
	}

	.pass-head {
		margin-bottom: 24px;
	}

	.merkle-card {
		margin-top: 38px;

		h2 {
			font-size: 26px;
		}

		p {
			font-size: 16px;
			line-height: 1.75;
		}
	}

	.merkle-tree {
		gap: 7px;
		margin-top: 26px;
	}

	.tree-row,
	.tree-arrows {
		gap: 8px;
	}

	.root-row {
		padding: 0 16px;
	}

	.tree-node {
		height: 38px;
		border-radius: 5px;
		font-size: 11px;
	}

	.branch-row .tree-node {
		font-size: 12px;
	}

	.result-footer {
		margin-top: 34px;
	}

	.contact-list {
		grid-template-columns: 1fr;
		gap: 9px;
	}

	.contact-item {
		padding: 11px 12px;
	}

	.contact-value {
		font-size: 13px;
	}

	.balance-head,
	.balance-row {
		grid-template-columns: minmax(96px, auto) minmax(0, 1fr);
		gap: 10px;
	}

	.balance-asset {
		gap: 10px;

		.asset-icon {
			width: 32px;
			height: 32px;
			flex-basis: 32px;
		}

		strong {
			font-size: 14px;
		}
	}

	.balance-amount {
		font-size: 20px;
	}
}

@media (max-width: 420px) {
	.balance-row {
		grid-template-columns: 1fr;
		align-items: start;
		gap: 8px;
		padding: 12px;
	}

	.balance-asset {
		width: 100%;
	}

	.balance-amount {
		width: 100%;
		justify-self: stretch;
		font-size: 18px;
		line-height: 1.2;
	}
}

@media (prefers-reduced-motion: reduce) {
	.por-verify-page,
	.por-verify-page *,
	.por-verify-page *::before,
	.por-verify-page *::after {
		animation-duration: 1ms !important;
		animation-iteration-count: 1 !important;
		scroll-behavior: auto !important;
		transition-duration: 1ms !important;
	}

	.topbar .back,
	.connect-action,
	.logout-button,
	.reserve-card,
	.reserve-action,
	.submit {
		transition: none;
	}

	.reserve-card:hover,
	.reserve-action:active,
	.logout-button:active,
	.connect-action:hover,
	.submit:active,
	.submit:hover,
	.connect-action:active {
		transform: none;
	}

	:global(.por-reserve-dialog),
	:global(.por-reserve-dialog *),
	:global(.por-reserve-dialog *::before),
	:global(.por-reserve-dialog *::after) {
		animation-duration: 1ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 1ms !important;
	}
}

:global(.por-reserve-dialog) {
	--eth-ink: #121212;
	--eth-muted: #616161;
	--eth-border: #cfcfcf;
	--eth-line: #e8e7ef;
	--eth-purple: #6c24e0;
	width: min(560px, calc(100vw - 40px)) !important;
	max-height: calc(100dvh - 48px);
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	overflow: hidden;
	font-family:
		Inter, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

:global(.por-reserve-dialog .el-dialog__header) {
	padding: 18px 22px 0;
	margin-right: 38px;
}

:global(.por-reserve-dialog .el-dialog__title) {
	color: var(--eth-ink);
	font-size: 22px;
	line-height: 1.18;
	font-weight: 900;
	text-wrap: balance;
}

:global(.por-reserve-dialog .el-dialog__headerbtn) {
	top: 10px;
	right: 10px;
	width: 32px;
	height: 32px;
	border-radius: 8px;
}

:global(.por-reserve-dialog .el-dialog__headerbtn:hover) {
	background: #f3efff;
}

:global(.por-reserve-dialog .el-dialog__headerbtn .el-dialog__close) {
	color: #303238;
}

:global(.por-reserve-dialog .el-dialog__body) {
	flex: 1;
	overflow-y: auto;
	padding: 12px 22px 18px;
}

@media (max-width: 720px) {
	:global(.por-reserve-dialog) {
		width: min(520px, calc(100vw - 40px)) !important;
		margin-top: 5vh !important;
		max-height: calc(100dvh - 48px);
	}

	:global(.por-reserve-dialog .el-dialog__header) {
		padding: 16px 18px 0;
		margin-right: 36px;
	}

	:global(.por-reserve-dialog .el-dialog__title) {
		font-size: 20px;
	}

	:global(.por-reserve-dialog .el-dialog__body) {
		padding: 10px 18px 16px;
	}
}
</style>
