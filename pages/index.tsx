import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex-auto">
      <Head>
        <title>Testing ZKP</title>
        <meta name="description" content="PoC of ZKP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-6">
        <p className="text-4xl font-bold">Testing ZKP</p>
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  What x and y add up to x * y + 4 == 10 ?
                </label>
                <div className="mt-1 p-2 md:grid md:grid-cols-2 md:gap-3 md:w-1/2">
                  <div className="md:col-span-1">
                    <textarea
                      id="x"
                      name="x"
                      rows={1}
                      className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder="x"
                      defaultValue={""}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <textarea
                      id="y"
                      name="y"
                      rows={1}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder="y"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">TODO: warning</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
