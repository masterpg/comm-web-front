/**
 * ロケーション情報を格納するデータクラスです。
 */
export declare class LocationData {
    constructor(src?: Location | HTMLAnchorElement);
    url: string;
    protocol: string;
    domain: string;
    port: string;
    host: string;
    path: string;
    hash: string;
    dir: string;
    base: string;
    ext: string;
    query: {};
}
/**
 * ロケーションを変更します。
 * @param path 変更するパスを指定します。
 * @param query 変更するパスに付与するクエリオブジェクトを指定します。
 */
export declare function moveTo(path: string, query?: {}): void;
/**
 * 指定されたurlをパースし、その情報を取得します。
 * @param url
 */
export declare function parse(url: any): LocationData;
/**
 * 指定されたパスのベースを取得します。
 * 例: "/foo/bar/index.html"が指定された場合、"index.html"が返されます。
 * @param path パスを指定します。
 */
export declare function getBase(path: string): string;
/**
 * 指定されたパスから拡張子を取得します。
 * 例: "/foo/bar/index.html"が指定された場合、".html"が返されます。
 * @param path パスを指定します。
 */
export declare function getExt(path: string): string;
/**
 * 指定されたパスからディレクトリを取得します。
 * 例: "/foo/bar/index.html"が指定された場合、"/foo/bar"が返されます。
 * @param path パスを指定します。
 */
export declare function getDir(path: string): string;
/**
 * 指定されたパスをURLに変換します。
 * @param path
 */
export declare function toUrl(path: string): string;
/**
 * 指定されたURLをパスに変換します。
 * 例: "http://localhost:5000/foo/bar/index.html"が指定された場合、
 *     "/foo/bar/index.html"が返されます。
 * @param url
 */
export declare function toPath(url: string): string;
/**
 * 現在のワーキングディレクトリをパスで取得します。
 * @param climbSteps ワーキングディレクトリをのぼるステップ数を指定します。
 *   例: ワーキングディレクトが /root/foo/var で、引数に｢2｣を指定した場合、戻り値は /root になる。
 */
export declare function cwd(climbSteps?: number): string;
/**
 * 指定されたパスを連結します。
 * @param args
 */
export declare function join(...args: string[]): string;
/**
 * 指定されたパスを配列に分割します。
 * @param path
 */
export declare function split(path: string): string[];
