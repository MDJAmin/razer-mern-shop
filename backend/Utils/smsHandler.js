export const sendAuthCode = async (Mobile) => {
  try {
    const res = await fetch("https://api.limosms.com/api/sendcode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        ApiKey: process.env.SMS_KEY,
      },
      body: JSON.stringify({
        Mobile,
        Footer: "خوش آمدید",
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "sms panel is disconnected" };
  }
};

export const verifyCode = async (Mobile, Code) => {
  try {
    const res = await fetch("https://api.limosms.com/api/checkcode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        ApiKey: process.env.SMS_KEY,
      },
      body: JSON.stringify({
        Mobile,
        Code,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "sms panel is disconnected" };
  }
};
