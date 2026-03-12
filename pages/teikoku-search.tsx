import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

type TeikokuEntry = {
  companyName: string;
  score: number;
  ratingDate: string;
  ratingCategory: string;
  address: string;
  industry: string;
  capital: string;
  employees: string;
  representative: string;
  established: string;
  corporateId: string;
};

const TEIKOKU_DB: TeikokuEntry[] = [
  {
    companyName: '合同会社デロイトトーマツ',
    score: 79,
    ratingDate: '2025/12/01',
    ratingCategory: 'B+',
    address: '東京都千代田区丸の内3-2-3 丸の内二重橋ビルディング',
    industry: '専門サービス業（コンサルティング・監査）',
    capital: '1億円',
    employees: '約1,943名',
    representative: '木村 研一',
    established: '2025/12/01',
    corporateId: '2010403011541',
  },
  {
    companyName: '株式会社テクノソリューションズ',
    score: 62,
    ratingDate: '2025/10/15',
    ratingCategory: 'B',
    address: '東京都渋谷区恵比寿1-1-1',
    industry: '情報・通信業',
    capital: '5,000万円',
    employees: '120名',
    representative: '山田 太郎',
    established: '2005/04/01',
    corporateId: '1234567890123',
  },
  {
    companyName: '山田製造株式会社',
    score: 71,
    ratingDate: '2025/11/20',
    ratingCategory: 'B+',
    address: '大阪府大阪市北区梅田2-2-2',
    industry: '製造業',
    capital: '1億円',
    employees: '350名',
    representative: '山田 花子',
    established: '1998/10/01',
    corporateId: '9876543210987',
  },
  {
    companyName: '東京商事株式会社',
    score: 83,
    ratingDate: '2025/09/01',
    ratingCategory: 'A',
    address: '東京都千代田区丸の内3-3-3',
    industry: '卸売業',
    capital: '3億円',
    employees: '820名',
    representative: '鈴木 一郎',
    established: '1975/06/15',
    corporateId: '1122334455667',
  },
  {
    companyName: '株式会社グリーンエナジー',
    score: 55,
    ratingDate: '2025/12/05',
    ratingCategory: 'C',
    address: '愛知県名古屋市中村区名駅4-4-4',
    industry: 'エネルギー業',
    capital: '2,000万円',
    employees: '45名',
    representative: '田中 健二',
    established: '2018/01/10',
    corporateId: '5544332211009',
  },
  {
    companyName: '日本物流サービス株式会社',
    score: 68,
    ratingDate: '2025/08/30',
    ratingCategory: 'B',
    address: '神奈川県横浜市西区みなとみらい5-5-5',
    industry: '運輸・物流業',
    capital: '8,000万円',
    employees: '280名',
    representative: '佐藤 美子',
    established: '2001/03/20',
    corporateId: '7788990011223',
  },
];

function getScoreColor(score: number): string {
  if (score >= 80) return '#006600';
  if (score >= 70) return '#004488';
  if (score >= 60) return '#cc6600';
  return '#cc0000';
}

export default function TeikokuSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TeikokuEntry[]>([]);
  const [searched, setSearched] = useState(false);

  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const now = new Date().toLocaleString('ja-JP');

  const handleSearch = () => {
    const filtered = query.trim()
      ? TEIKOKU_DB.filter((e) => e.companyName.includes(query.trim()))
      : TEIKOKU_DB;
    setResults(filtered);
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'F5') {
      handleSearch();
    }
  };

  return (
    <>
      <Head>
        <title>帝国データバンク 評点照会システム</title>
      </Head>
      <div className="window">
        <div className="title-bar">
          <span className="title-bar-text">帝国データバンク 評点照会システム v2.4</span>
          <span>_ □ ×</span>
        </div>
        <div className="menu-bar">
          <a href="#">ファイル(F)</a>
          <a href="#">照会(Q)</a>
          <Link href="/">メインメニュー(M)</Link>
          <a href="#">ヘルプ(H)</a>
        </div>
        <div className="content-area">
          <div className="section-title">■ 企業検索条件</div>

          <table style={{ width: 'auto', marginBottom: '16px' }}>
            <tbody>
              <tr>
                <td style={{ border: 'none', backgroundColor: 'transparent', padding: '4px 8px', fontWeight: 'bold', color: '#000080', width: '80px' }}>
                  企業名
                </td>
                <td style={{ border: 'none', backgroundColor: 'transparent', padding: '4px 4px' }}>
                  <input
                    id="teikoku-search-query"
                    type="text"
                    className="form-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="企業名を入力してください"
                    style={{ width: '280px', maxWidth: '280px' }}
                  />
                </td>
                <td style={{ border: 'none', backgroundColor: 'transparent', padding: '4px 8px' }}>
                  <button
                    id="teikoku-search-btn"
                    className="btn btn-primary"
                    onClick={handleSearch}
                  >
                    検索(F5)
                  </button>
                </td>
                <td style={{ border: 'none', backgroundColor: 'transparent', padding: '4px 8px' }}>
                  <button
                    className="btn"
                    onClick={() => { setQuery(''); setResults([]); setSearched(false); }}
                  >
                    クリア
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {searched && (
            <>
              <div className="section-title">
                ■ 照会結果　（
                <span id="teikoku-result-count">{results.length}</span>
                件）
              </div>

              {results.length === 0 && (
                <div className="alert-warn">
                  該当する企業が見つかりませんでした。検索条件を変更して再度照会してください。
                </div>
              )}

              {results.map((entry) => (
                <div
                  key={entry.corporateId}
                  style={{ marginBottom: '16px', border: '1px solid #808080' }}
                >
                  <div
                    style={{
                      backgroundColor: '#000080',
                      color: '#ffffff',
                      padding: '3px 8px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    【評点情報】{entry.companyName}
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                            width: '160px',
                          }}
                        >
                          帝国評点
                        </td>
                        <td>
                          <span
                            id={`teikoku-score-${entry.corporateId}`}
                            className="teikoku-score"
                            style={{ color: getScoreColor(entry.score) }}
                          >
                            {entry.score}
                          </span>
                          <span className="teikoku-score-label">/ 100点</span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          評価区分
                        </td>
                        <td>
                          <span
                            id={`teikoku-category-${entry.corporateId}`}
                            style={{ fontWeight: 'bold', fontSize: '14px' }}
                          >
                            {entry.ratingCategory}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          評価日
                        </td>
                        <td id={`teikoku-date-${entry.corporateId}`}>{entry.ratingDate}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          企業名
                        </td>
                        <td id={`teikoku-name-${entry.corporateId}`}>{entry.companyName}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          所在地
                        </td>
                        <td id={`teikoku-address-${entry.corporateId}`}>{entry.address}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          業種
                        </td>
                        <td id={`teikoku-industry-${entry.corporateId}`}>{entry.industry}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          資本金
                        </td>
                        <td>{entry.capital}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          従業員数
                        </td>
                        <td>{entry.employees}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          代表者
                        </td>
                        <td>{entry.representative}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          設立年月日
                        </td>
                        <td>{entry.established}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          法人番号
                        </td>
                        <td>{entry.corporateId}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            color: '#000080',
                          }}
                        >
                          照会日時
                        </td>
                        <td>{now}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="status-bar">
          <span className="status-panel">
            {searched
              ? `照会完了 — ${results.length}件ヒット`
              : '照会待機中'}
          </span>
          <span className="status-panel">ユーザー: TPRM-OPS001</span>
          <span className="status-panel">日付: {today}</span>
          <span className="status-panel">帝国データバンク 接続中</span>
        </div>
      </div>
    </>
  );
}
