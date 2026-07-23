# なぞなぞ花火アプリ

なぞなぞの答えを入力し、正解するとブラウザいっぱいに花火が表示されるWebアプリです。

Flaskで画面の切り替えと答えの判定を行い、p5.jsで花火のアニメーションを描画しています。

## 主な機能

- なぞなぞ形式のパスワード入力
- 不正解時の赤いエラーメッセージ
- 正解時の花火アニメーション
- 2色の火花が同じ位置から広がる演出
- ブラウザサイズに合わせたキャンバスの自動調整

## 使用技術

- Python
- Flask
- HTML / CSS
- JavaScript
- p5.js

## ディレクトリ構成

```text
hibana/
├── app.py                  # Flaskアプリ本体・答えの判定
├── requirements.txt       # Pythonの依存パッケージ
├── .gitignore             # Gitで管理しないファイルの設定
├── Fireworks.txt           # 花火に関するメモ
├── templates/
│   ├── login.html          # なぞなぞ・答えの入力画面
│   └── hanabi.html         # 花火を表示する画面
└── static/
    ├── script.js           # 花火の生成・移動・爆発処理
    ├── style.css           # 画面のスタイル（現在は空）
    └── lib/
        └── p5.min.js       # p5.jsライブラリ
```

`.venv/` と `__pycache__/` は実行時に作られるため、Gitの管理対象には含めません。

## セットアップ

### 1. リポジトリを取得

```bash
git clone https://github.com/momijyu/hibana.git
cd hibana
```

### 2. 仮想環境を作成

初回だけ実行します。

```bash
python3 -m venv .venv
```

### 3. 仮想環境を有効化

macOSまたはLinuxの場合:

```bash
source .venv/bin/activate
```

ターミナルの先頭に `(.venv)` と表示されれば有効化されています。

### 4. Flaskをインストール

```bash
python -m pip install -r requirements.txt
```

## localhostで起動

仮想環境を有効にし、答えを環境変数へ設定してから実行します。

```bash
export APP_PASSWORD="任意の答え"
python app.py
```

起動後、ブラウザで次のURLを開きます。

```text
http://localhost:5001/login/
```

終了するときは、起動したターミナルで `Ctrl+C` を押します。

### Flaskコマンドで起動する場合

```bash
flask --app app run --debug --port 5001
```

## アプリの流れ

```text
ブラウザで /login/ を開く
          │
          ▼
なぞなぞの答えを入力して送信
          │
          ▼
Flaskが答えを判定
     ┌────┴────┐
     │         │
   正解       不正解
     │         │
     ▼         ▼
花火を表示   赤いエラーを表示
```

答えはソースコードへ直接記載せず、起動時に環境変数 `APP_PASSWORD` で設定します。この入力画面は作品の演出を目的としたもので、本格的なユーザー認証機能ではありません。

## 花火の調整

花火の設定は `static/script.js` で変更できます。

### 花火が上がる頻度

```javascript
if (random(1) < 0.03) {
```

`0.03` を大きくすると花火が頻繁に上がります。

### 爆発する火花の量

```javascript
let numParticles = random(150, 350);
```

数値を大きくすると、火花の密度が高くなります。

### 爆発の広がり

```javascript
this.vel.mult(random(2, 20));
```

最大値の `20` を大きくすると、花火がより大きく広がります。

## Raspberry Piで起動する場合

Raspberry Piへ接続したあと、プロジェクトへ移動して起動します。

```bash
cd ~/hibana
export APP_PASSWORD="任意の答え"
python3 app.py
```

同じネットワーク上の端末から、次の形式でアクセスできます。

```text
http://<RASPBERRY_PI_IP>:5001/login/
```


## 補足

- 開発用サーバーは `0.0.0.0:5001` で待ち受けます。
- `debug=True` は開発・実習専用です。インターネットへ公開する環境では無効にしてください。
- Mac用に作った `.venv` はRaspberry Piへコピーせず、必要な場合はRaspberry Pi側で作り直してください。
