import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const CONTRACT_TYPES = [
  '-- 選択してください --',
  '業務委託',
  '請負',
  '売買',
  '派遣',
  'SaaS/クラウドサービス',
  '保守・サポート',
  'その他',
];

type FormState = {
  companyName: string;
  address: string;
  employees: string;
  capital: string;
  teikokuScore: string;
  contractName: string;
  contractDetail: string;
  annualPayment: string;
  contractType: string;
  contractStart: string;
  contractEnd: string;
};

const emptyForm: FormState = {
  companyName: '合同会社デロイトトーマツ',
  address: '東京都千代田区丸の内3-2-3 丸の内二重橋ビルディング',
  employees: '約1,943名',
  capital: '1億円',
  teikokuScore: '',
  contractName: '',
  contractDetail: '',
  annualPayment: '',
  contractType: '',
  contractStart: '',
  contractEnd: '',
};

export default function ThirdPartyEntry() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState('');

  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    const newId = `TP-${String(Date.now()).slice(-4)}`;
    setSavedId(newId);
    setSaved(true);
  };

  const handleClear = () => {
    setForm(emptyForm);
    setSaved(false);
    setSavedId('');
  };

  return (
    <>
      <Head>
        <title>サードパーティ情報管理システム</title>
      </Head>
      <div className="window">
        <div className="title-bar">
          <span className="title-bar-text">サードパーティ情報管理システム v1.8　— 新規登録</span>
          <span>_ □ ×</span>
        </div>
        <div className="menu-bar">
          <a href="#">ファイル(F)</a>
          <a href="#">登録(R)</a>
          <Link href="/">メインメニュー(M)</Link>
          <a href="#">ヘルプ(H)</a>
        </div>
        <div className="content-area">

          {saved && (
            <div id="tp-save-success" className="alert-success">
              ✔ サードパーティ情報を新規登録しました（管理ID: {savedId}）
            </div>
          )}

          {/* ── Section 1: 企業基本情報 ── */}
          <div className="section-title">■ 企業基本情報</div>

          <div className="form-row">
            <label className="form-label field-required">企業名（サードパーティ名）</label>
            <input
              id="tp-company-name"
              name="companyName"
              type="text"
              className="form-input"
              value={form.companyName}
              onChange={handleChange}
              placeholder="例: 株式会社テクノソリューションズ"
              style={{ maxWidth: '360px' }}
            />
          </div>

          <div className="form-row">
            <label className="form-label">住所</label>
            <input
              id="tp-address"
              name="address"
              type="text"
              className="form-input"
              value={form.address}
              onChange={handleChange}
              placeholder="例: 東京都渋谷区恵比寿1-1-1"
              style={{ maxWidth: '360px' }}
            />
          </div>

          <div className="form-row">
            <label className="form-label">従業員数</label>
            <input
              id="tp-employees"
              name="employees"
              type="text"
              className="form-input"
              value={form.employees}
              onChange={handleChange}
              placeholder="例: 120名"
              style={{ maxWidth: '160px' }}
            />
          </div>

          <div className="form-row">
            <label className="form-label">資本金</label>
            <input
              id="tp-capital"
              name="capital"
              type="text"
              className="form-input"
              value={form.capital}
              onChange={handleChange}
              placeholder="例: 5,000万円"
              style={{ maxWidth: '200px' }}
            />
          </div>

          <div className="form-row">
            <label className="form-label">帝国評点の結果</label>
            <input
              id="tp-teikoku-score"
              name="teikokuScore"
              type="text"
              className="form-input"
              value={form.teikokuScore}
              onChange={handleChange}
              placeholder="例: 62"
              style={{ maxWidth: '120px' }}
            />
            <span style={{ fontSize: '11px', color: '#808080' }}>（0〜100の整数）</span>
          </div>

          {/* ── Section 2: 契約情報 ── */}
          <div className="section-title" style={{ marginTop: '12px' }}>■ 契約情報</div>

          <div className="form-row">
            <label className="form-label field-required">契約名</label>
            <input
              id="tp-contract-name"
              name="contractName"
              type="text"
              className="form-input"
              value={form.contractName}
              onChange={handleChange}
              placeholder="例: ITインフラ保守委託契約"
              style={{ maxWidth: '360px' }}
            />
          </div>

          <div className="form-row" style={{ alignItems: 'flex-start' }}>
            <label className="form-label" style={{ paddingTop: '2px' }}>契約詳細</label>
            <textarea
              id="tp-contract-detail"
              name="contractDetail"
              className="form-input"
              value={form.contractDetail}
              onChange={handleChange}
              rows={4}
              placeholder="契約の詳細内容を入力してください"
              style={{ maxWidth: '400px', resize: 'vertical' }}
            />
          </div>

          <div className="form-row">
            <label className="form-label">年間支払金額（¥）</label>
            <input
              id="tp-annual-payment"
              name="annualPayment"
              type="number"
              className="form-input"
              value={form.annualPayment}
              onChange={handleChange}
              placeholder="例: 12000000"
              style={{ maxWidth: '180px' }}
            />
            <span style={{ fontSize: '11px', color: '#808080' }}>
              {form.annualPayment
                ? `¥${Number(form.annualPayment).toLocaleString('ja-JP')}`
                : ''}
            </span>
          </div>

          <div className="form-row">
            <label className="form-label field-required">契約タイプ</label>
            <select
              id="tp-contract-type"
              name="contractType"
              className="form-input"
              value={form.contractType}
              onChange={handleChange}
              style={{ maxWidth: '200px' }}
            >
              {CONTRACT_TYPES.map((t) => (
                <option key={t} value={t === '-- 選択してください --' ? '' : t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label field-required">契約開始日</label>
            <input
              id="tp-contract-start"
              name="contractStart"
              type="date"
              className="form-input"
              value={form.contractStart}
              onChange={handleChange}
              style={{ maxWidth: '160px', colorScheme: 'light' }}
            />
          </div>

          <div className="form-row">
            <label className="form-label field-required">契約終了日</label>
            <input
              id="tp-contract-end"
              name="contractEnd"
              type="date"
              className="form-input"
              value={form.contractEnd}
              onChange={handleChange}
              style={{ maxWidth: '160px', colorScheme: 'light' }}
            />
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <button className="btn btn-primary" onClick={handleSave}>
              登録(F8)
            </button>
            <button className="btn" onClick={handleClear}>
              クリア
            </button>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button className="btn">メインメニューへ戻る</button>
            </Link>
          </div>
        </div>
        <div className="status-bar">
          <span className="status-panel">
            {saved ? '登録完了' : '新規入力待機中'}
          </span>
          <span className="status-panel">ユーザー: TPRM-OPS001</span>
          <span className="status-panel">日付: {today}</span>
          <span className="status-panel">接続先: TPRM-SV01</span>
        </div>
      </div>
    </>
  );
}
