// components/SocialIcons.tsx
import { FaFacebook, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa6';

const commonProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'p-3 rounded-full text-white text-xl md:text-[32px] transition-colors',
};

export function FacebookIcon() {
    return (
        <a
            {...commonProps}
            href="https://www.facebook.com/profile.php?id=61559648591780&mibextid=wwXIfr&rdid=jU2vf0Sz5iWzlnUW&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1F3fdRxhRb%2F%3Fmibextid%3DwwXIfr"
            aria-label="Facebook"
            className={`${commonProps.className} bg-blue-700 hover:bg-blue-500 hover:scale-110`}
        >
            <FaFacebook />
        </a>
    );
}

export function YoutubeIcon() {
    return (
        <a
            {...commonProps}
            href="https://www.youtube.com/@CarHypeDK"
            aria-label="YouTube"
            className={`${commonProps.className} bg-red-600 hover:bg-red-400 hover:scale-110 text-[26px] md:text-[42px] p-4`}
        >
            <FaYoutube />
        </a>
    );
}

export function TiktokIcon() {
    return (
        <a
            {...commonProps}
            href="https://www.tiktok.com/@carhypedk"
            aria-label="TikTok"
            className={`${commonProps.className} bg-black hover:bg-gray-500 hover:scale-110 text-[26px] md:text-[42px] p-4`}
        >
            <FaTiktok />
        </a>
    );
}

export function InstagramIcon() {
    return (
        <a
            {...commonProps}
            href="https://www.instagram.com/carhypedk"
            aria-label="Instagram"
            className={`${commonProps.className} bg-pink-600 hover:bg-pink-500 hover:scale-110`}
        >
            <FaInstagram />
        </a>
    );
}
