import React from "react";

type Props = { h: string };

function ContactHTML({ h }: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* TO */}
        <div
          className="w-full md:w-1/2"
          dangerouslySetInnerHTML={{ __html: h }}
        />
        {/* FROM */}
        <div className="w-full md:w-1/2">
          <p>
            From:
            <br />
            Nigel Walker&nbsp;
            <br />
            President / CEO&nbsp;
            <br />
            Lorem, ipsum.&nbsp;
          </p>

          <p>
            Infinity Laboratories&nbsp;
            <br />
            1585 South Perry Street
            <br />
            Castle Rock, Colorado 80104
            <br />
            United States&nbsp;
          </p>
          <p>www.infinitylaboratories.com&nbsp;</p>
        </div>
      </div>
    </>
  );
}

export default ContactHTML;
