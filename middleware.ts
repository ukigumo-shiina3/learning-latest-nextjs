import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], //matcher→ユーザーからのリクエストがマッチしているか判断。ミドルウェアがサーバの機能なのでマッチしているものだけ通さず、全て通すとサーバーリソースを食いすぎてしまう問題が起きてしまう。
  // 正規表現の条件→リクエストされたパスが "api","_next/static","_next/image" または ".png" で終わる場合はマッチしない。それ以外のすべてのパスにマッチする。
};

// ミドルウェア→Next.js全体の機能で、中間で動作するアプリケーション。ここではユーザーから認証のリクエストが飛んできて、Next.jsのアプリケーションに行く前に、認証しているユーザーかどうかをミドルウェアを間に挟むことで判断している。
// 他にもユーザーから来た情報にログを仕込んだり、認証してリダイレクトしたり、リライトなど細かいこともミドルウェアができる
