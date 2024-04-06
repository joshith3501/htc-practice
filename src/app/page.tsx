import Image from "next/image";
import styles from "@/styles/homepage.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiHospitalLine } from "react-icons/ri";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaHeartPulse } from "react-icons/fa6";
import { LoginButton } from "@/components/auth/login-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main
      className={`min-h-screen overflow-hidden h-lvh px-28 pt-5 ${styles.homepage}`}
    >
      <header className={styles.header}>
        <div className={styles.logo}>
          <div>
            <Image src="/logo.svg" alt="" width={20} height={20}></Image>
          </div>
        </div>
        <div className={styles.referenceLinks}>
          <div className={styles.product}>Product</div>
          <div className={styles.resource}>Resource</div>
          <div className={styles.ourWork}>Our Work</div>
        </div>
        {/* <div className={styles.buttons}> */}
        {/* <div className={styles.mode}><ModeToggle /></div> */}
        {/* <div className={styles.getStarted}> */}
        <Link
          href="/auth/login"
          className={cn(
            buttonVariants({ variant: "default", size: "icon" }),
            "w-[80px]"
          )}
        >
          Sign In
        </Link>
        {/* </div> */}
        {/* </div> */}
      </header>
      <div className={styles.intro}>
        <div className={styles.about}>
          <div className={styles.title}>- Health Trust Chain</div>
          <div className={styles.info}>
            <MdOutlineHealthAndSafety className={styles.infoLogo} />
            {/* <FaHeartPulse /> */}
            <span>Health Care System, Revolutionized</span>
          </div>
          <div className={styles.caseStudy}>
            {/* <LoginButton>
              <button>
                <span>Sign In</span>
                <FaArrowRightLong />
              </button>
            </LoginButton> */}
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants({ variant: "default", size: "icon" }),
                "w-[180px]"
              )}
            >
              Register Now!
            </Link>
          </div>
        </div>
        <div className={styles.introImg}>
          <Image
            className={styles.introImage}
            src="/homepage_robot.png"
            alt=" "
            width={320}
            height={320}
          ></Image>
        </div>
      </div>
      {/* 
      <div className={styles.userCards}>
        <div className={styles.patient}>
          <div className={styles.cardLogo}>
            <div className={styles.userIcon}>
              <FaRegUser className={styles.patientLogo} />
            </div>
            <div className={styles.userType}>User</div>
          </div>
          <div className={styles.userInfo}>Pateint, Guardian or Relatives</div>
          <div className={styles.userReg}>
            <Link href="/mail" className={styles.userRegLink}>
              <button>Patient</button>
            </Link>
          </div>
        </div>

        <div className={styles.doctor}>
          <div className={styles.cardLogo}>
            <div className={styles.userIcon}>
              <FaUserDoctor className={styles.doctorLogo} />
            </div>
            <div className={styles.userType}>Doctor</div>
          </div>
          <div className={styles.userInfo}>For the doctors quick access</div>
          <div className={styles.userReg}>
            <Link href="/mail" className={styles.userRegLink}>
              {" "}
              <button>Doctor</button>
            </Link>
          </div>
        </div>

        <div className={styles.hospital}>
          <div className={styles.cardLogo}>
            <div className={styles.userIcon}>
              <RiHospitalLine className={styles.hospitalLogo} />
            </div>
            <div className={styles.userType}>Hospital</div>
          </div>
          <div className={styles.userInfo}>Consists of Staff and doctors</div>
          <div className={styles.userReg}>
            <Link href="/mail" className={styles.userRegLink}>
              <button>Hospital</button>
            </Link>
          </div>
        </div> */}
      {/* </div> */}
    </main>
  );
}
