import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const PasskeyModal = ({ setModal }) => {
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
    setModal(false); // Close modal when the close button is clicked
  };

  const validatePasskey = (e) => {
    e.preventDefault();

    if (passkey === process.env.REACT_APP_ADMIN_PASSKEY) {
      navigate("/admin");
      setOpen(false);
      setModal(false); // Close the modal after successful validation
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <IoCloseOutline
              fontSize={"40px"}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center w-full">
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp justify-center w-full">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  className="shad-otp-slot"
                  index={index}
                  key={index}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validatePasskey}
            className="shad-primary-btn w-full"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
