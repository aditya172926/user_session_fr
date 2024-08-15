"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../../constants";
import { useRouter, useSearchParams } from "next/navigation";

export default function User() {
  const [userData, setUserData] = useState(null);
  const searchParams = useSearchParams();

  const params = searchParams.get('mobile');

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`${SERVER_BASE_URL}/${params}`);
      console.log(user, user.data);
      setUserData(user.data);
    }
    getUser();
  }, [])

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-6 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Welcome
          </h2>
          <p className="text-center">Here is your raw Session data:</p>

          <pre className="p-4 text-sm bg-gray-100 border border-gray-300 rounded-md max-h-96 overflow-auto">
            <code>{JSON.stringify(userData, null, 2)}</code>
          </pre>
        </div>
      </div>
    </>
  );
}
