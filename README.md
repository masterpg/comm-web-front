# comm-web-front

## 環境構築

yarn をインストールします。

```console
$ npm install -g yarn
```

プロジェクトの依存パッケージをインストールします。

```console
$ yarn install
```

## コンパイル

次のコマンドでソースファイルのビルドを行います。

```console
$ yarn build
```

コンパイル結果が`lib/`に出力されます。

## 開発サーバー

開発サーバーを起動します。

```console
$ yarn dev
```

起動したらブラウザで下記 URL にアクセスすることで各画面を確認できます。

- コンポーネントのデモ画面: http://localhost:5000/demo.html
- 単体テスト実行画面: http://localhost:5000/test.html

## 単体テスト

上記で示したようにブラウザでも単体テストの実行を行うことができますが、コンソールでも単体テストを実行することができます。

```console
$ yarn test
```
