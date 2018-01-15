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

Bowerをインストールします。

```console
$ npm install -g bower
```

プロジェクトの依存パッケージをインストールします。

```console
$ bower install
```


## 開発サーバー

開発サーバーを起動します。

```console
$ gulp dev
```

起動したらブラウザで http://localhost:5000/test/index.html にアクセスすることで単体テストが実行されます。


## コンパイル

次のコマンドでソースファイルのビルドを行います。

```console
$ gulp build
```

コンパイル結果が`lib/`に出力されます。

