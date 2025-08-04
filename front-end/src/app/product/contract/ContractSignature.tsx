import React, { useRef } from "react";
import SignaturePad from "react-signature-canvas";
import Image from "next/image";

interface Props {
  farmSignatureUrl: string;
  farmName: string;
  lesseeSignature: string | null | undefined;
  setLesseeSignature: (v: string) => void;
  lesseeName: string;
}

export default function ContractSignature({
  farmSignatureUrl,
  lesseeSignature,
  setLesseeSignature,
  farmName,
  lesseeName,
}: Props) {
  const sigPadRef = useRef<SignaturePad | null>(null);

  const handleSignatureEnd = () => {
    const dataUrl = sigPadRef.current?.toDataURL();
    if (dataUrl) setLesseeSignature(dataUrl);
  };

  return (
    <div className="grid grid-cols-2 gap-8 mb-6">
      <div className="text-center">
        <div className="font-bold mb-4 text-base text-black">
          ĐẠI DIỆN BÊN A
        </div>
        <div className="h-16 flex items-center justify-center">
          <Image
            src={farmSignatureUrl || "/signature-a.png"}
            alt="Chữ ký bên A"
            width={120}
            height={64}
            className="h-16 object-contain"
          />
        </div>
        <div className="font-semibold text-base text-black">{farmName}</div>
      </div>
      <div className="text-center">
        <div className="font-bold mb-4 text-base text-black">
          ĐẠI DIỆN BÊN B
        </div>
        <div className="h-16 flex items-center justify-center">
          {lesseeSignature ? (
            <Image
              src={lesseeSignature}
              alt="Chữ ký bên B"
              width={200}
              height={64}
              className="h-16 object-contain"
            />
          ) : (
            <SignaturePad
              ref={sigPadRef}
              onEnd={handleSignatureEnd}
              penColor="black"
              canvasProps={{
                width: 200,
                height: 64,
                className: "border",
              }}
            />
          )}
        </div>
        <div className="font-semibold text-base text-black">
          {lesseeName || "_________________"}
        </div>
      </div>
    </div>
  );
}
