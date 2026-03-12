import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const lastLogin = new Date(Date.now() - 86400000).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }) + ' 09:15:42';

  return (
    <>
      <Head>
        <title>TPRMオンボーディング支援システム</title>
      </Head>
      <div className="window">
        <div className="title-bar">
          <span className="title-bar-text">TPRMオンボーディング支援システム ver.1.0.0</span>
          <span>_ □ ×</span>
        </div>
        <div className="menu-bar">
          <a href="#">ファイル(F)</a>
          <a href="#">表示(V)</a>
          <a href="#">ヘルプ(H)</a>
        </div>
        <div className="content-area">
          <div className="section-title">■ メインメニュー — TPRM オンボーディング支援</div>

          <table style={{ marginBottom: '16px', width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%', backgroundColor: '#e0e8f0', padding: '16px', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 'bold', color: '#000080', fontSize: '13px', marginBottom: '8px', borderBottom: '1px solid #000080', paddingBottom: '4px' }}>
                    【帝国評点照会業務】
                  </div>
                  <ul className="nav-links">
                    <li>
                      <Link href="/teikoku-search" id="nav-teikoku">
                        ▶ 帝国評点照会システム
                      </Link>
                    </li>
                  </ul>
                  <div style={{ fontSize: '11px', color: '#606060', marginTop: '8px' }}>
                    企業名をキーとして帝国データバンクの<br />
                    評点情報を照会します。
                  </div>
                </td>
                <td style={{ width: '50%', backgroundColor: '#e8f0e0', padding: '16px', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 'bold', color: '#000080', fontSize: '13px', marginBottom: '8px', borderBottom: '1px solid #000080', paddingBottom: '4px' }}>
                    【サードパーティ情報管理】
                  </div>
                  <ul className="nav-links">
                    <li>
                      <Link href="/thirdparty-entry" id="nav-thirdparty">
                        ▶ サードパーティ情報登録・更新
                      </Link>
                    </li>
                  </ul>
                  <div style={{ fontSize: '11px', color: '#606060', marginTop: '8px' }}>
                    サードパーティの契約情報および<br />
                    帝国評点を登録・管理します。
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="section-title">■ システム情報</div>
          <table style={{ width: '60%' }}>
            <tbody>
              <tr>
                <td style={{ backgroundColor: '#f0f0f0', width: '200px', fontWeight: 'bold', color: '#000080' }}>本日日付</td>
                <td>{today}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', color: '#000080' }}>ログインユーザー</td>
                <td>TPRM-OPS001（TPRMオペレーター）</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', color: '#000080' }}>接続先サーバー</td>
                <td>TPRM-SV01 (192.168.10.101)</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', color: '#000080' }}>最終ログイン</td>
                <td>{lastLogin}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', color: '#000080' }}>システムバージョン</td>
                <td>TPRM-OB ver.1.0.0 (Build 20250401)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="status-bar">
          <span className="status-panel">準備完了</span>
          <span className="status-panel">ユーザー: TPRM-OPS001</span>
          <span className="status-panel">日付: {today}</span>
          <span className="status-panel">接続先: TPRM-SV01</span>
        </div>
      </div>
    </>
  );
}
