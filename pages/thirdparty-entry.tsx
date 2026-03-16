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
  '準委任',
  'その他',
];

type FormState = {
  companyName: string;
  address: string;
  contractName: string;
  contractDetail: string;
  annualPayment: string;
  contractType: string;
  contractStart: string;
  contractEnd: string;
};

const emptyForm: FormState = {
  companyName: '',
  address: '',
  contractName: '',
  contractDetail: '',
  annualPayment: '',
  contractType: '',
  contractStart: '',
  contractEnd: '',
};

// 委託先管理システム固有のカラー定数
const GREEN_DARK = '#004d00';
const GREEN_MID = '#007700';
const GREEN_LIGHT = '#e8f5e8';
const GREEN_SECTION_BG = '#004d00';

// デモ入力シーケンス: [フィールド名, 入力値] の順
const DEMO_STEPS: [keyof FormState, string][] = [
  ['companyName', '合同会社デロイトトーマツ'],
  ['address', '東京都千代田区丸の内3-2-3 丸の内二重橋ビルディング'],
  ['contractName', 'コンサルティング契約'],
  ['annualPayment', '10,000,000'],
  ['contractType', '準委任'],
  ['contractStart', '2026-04-01'],
  ['contractEnd', '2026-05-01'],
];

export default function ThirdPartyEntry() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState('');
  const [demoStarted, setDemoStarted] = useState(false);

  const handleDemoStart = () => {
    if (demoStarted) return;
    setDemoStarted(true);
    setForm(emptyForm);
    setSaved(false);
    // 3秒後から2秒間隔で順に入力
    DEMO_STEPS.forEach(([field, value], i) => {
      setTimeout(() => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (i === DEMO_STEPS.length - 1) {
          setDemoStarted(false);
        }
      }, 3000 + i * 2000);
    });
  };

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
        <title>委託先管理システム</title>
      </Head>
      <div
        className="window"
        style={{ borderColor: GREEN_MID, borderStyle: 'solid' }}
      >
        {/* タイトルバー: 濃緑グラデーション */}
        <div
          className="title-bar"
          style={{ background: `linear-gradient(to right, ${GREEN_DARK}, ${GREEN_MID})` }}
        >
          <span className="title-bar-text">委託先管理システム v1.8　— 新規登録</span>
          <span>_ □ ×</span>
        </div>

        {/* メニューバー: 薄緑背景 */}
        <div
          className="menu-bar"
          style={{ backgroundColor: GREEN_LIGHT, borderBottomColor: GREEN_MID }}
        >
          <a href="#" style={{ color: GREEN_DARK }}>ファイル(F)</a>
          <a href="#" style={{ color: GREEN_DARK }}>登録(R)</a>
          <Link href="/" style={{ color: GREEN_DARK }}>メインメニュー(M)</Link>
          <a href="#" style={{ color: GREEN_DARK }}>ヘルプ(H)</a>
        </div>

        <div className="content-area">

          {saved && (
            <div id="tp-save-success" className="alert-success">
              ✔ 委託先情報を新規登録しました（管理ID: {savedId}）
            </div>
          )}

          {/* ── Section 1: 企業基本情報 ── */}
          <div
            className="section-title"
            style={{ backgroundColor: GREEN_SECTION_BG }}
          >
            ■ 企業基本情報
          </div>

          <div className="form-row">
            <label className="form-label field-required" style={{ color: GREEN_DARK }}>企業名（委託先名）</label>
            <input
              id="tp-company-name"
              name="companyName"
              type="text"
              className="form-input"
              value={form.companyName}
              onChange={handleChange}
              placeholder=""
              style={{ maxWidth: '360px' }}
            />
          </div>

          <div className="form-row">
            <label className="form-label" style={{ color: GREEN_DARK }}>住所</label>
            <input
              id="tp-address"
              name="address"
              type="text"
              className="form-input"
              value={form.address}
              onChange={handleChange}
              placeholder=""
              style={{ maxWidth: '360px' }}
            />
          </div>

          {/* ── Section 2: 契約情報 ── */}
          <div
            className="section-title"
            style={{ backgroundColor: GREEN_SECTION_BG, marginTop: '12px' }}
          >
            ■ 契約情報
          </div>

          <div className="form-row">
            <label className="form-label field-required" style={{ color: GREEN_DARK }}>契約名</label>
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
            <label className="form-label" style={{ paddingTop: '2px', color: GREEN_DARK }}>契約詳細</label>
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
            <label className="form-label" style={{ color: GREEN_DARK }}>年間支払金額（¥）</label>
            <input
              id="tp-annual-payment"
              name="annualPayment"
              type="text"
              className="form-input"
              value={form.annualPayment}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, '');
                if (raw === '' || /^\d+$/.test(raw)) {
                  const formatted = raw === '' ? '' : Number(raw).toLocaleString('ja-JP');
                  setForm((prev) => ({ ...prev, annualPayment: formatted }));
                  setSaved(false);
                }
              }}
              placeholder="例: 12,000,000"
              style={{ maxWidth: '180px' }}
            />
          </div>

          <div className="form-row">
            <label className="form-label field-required" style={{ color: GREEN_DARK }}>契約タイプ</label>
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
            <label className="form-label field-required" style={{ color: GREEN_DARK }}>契約開始日</label>
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
            <label className="form-label field-required" style={{ color: GREEN_DARK }}>契約終了日</label>
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
            {/* 登録ボタン: 緑プライマリ */}
            <button
              className="btn"
              onClick={handleSave}
              style={{
                backgroundColor: GREEN_DARK,
                color: '#ffffff',
                borderTopColor: GREEN_MID,
                borderLeftColor: GREEN_MID,
                borderRightColor: '#002200',
                borderBottomColor: '#002200',
              }}
            >
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

        {/* ステータスバー: 薄緑背景 */}
        <div
          className="status-bar"
          style={{ backgroundColor: GREEN_LIGHT, borderTopColor: GREEN_MID }}
        >
          <span className="status-panel">
            {saved ? '登録完了' : '新規入力待機中'}
          </span>
          <span className="status-panel">ユーザー: TPRM-OPS001</span>
          <span className="status-panel">日付: {today}</span>
          <span className="status-panel">接続先: TPRM-SV01</span>
        </div>
      </div>

      {/* 左下固定の開始ボタン */}
      <div style={{ position: 'fixed', bottom: 12, left: 60, zIndex: 9999 }}>
        <button
          className="btn"
          onClick={handleDemoStart}
          disabled={demoStarted}
          style={{ padding: '4px 14px', fontSize: 12 }}
        >
          {demoStarted ? '処理中...' : '開始'}
        </button>
      </div>
    </>
  );
}
