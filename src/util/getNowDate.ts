export const getNowDate = () => {
  const now = new Date();

  if (process.env.TZ === 'asia/tokyo') {
    // 環境設定がasia/tokyoの場合は、JSTに変換して返却
    const nowProd = new Date();
    nowProd.setHours(now.getHours() + 9);
    return nowProd;
  } else {
    return now;
  }
};
