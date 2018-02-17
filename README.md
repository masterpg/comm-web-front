# lived-js-front

## 環境構築

yarnをインストールします。

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
$ gulp build
```

コンパイル結果が`lib/`に出力されます。


## 開発サーバー

開発サーバーを起動します。

```console
$ gulp serve
```

起動したらブラウザで http://localhost:5000/test/ にアクセスすることで単体テストが実行されます。


## 単体テスト

上記で示したようにブラウザでも単体テストの実行を行うことができますが、コンソールでも単体テストを実行することができます。

```console
$ gulp test
```

