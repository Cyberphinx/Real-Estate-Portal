export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function dateFormatter(date: Date) {
    return new Date(date).toLocaleString();
}

export function dateFormatterShort(date: Date) {
    return new Date(date).toLocaleDateString();
}

export function PascalToNormal(value: string) {
    return value = value.replace(/([A-Z])/g, ' $1').trim();
}

export const icons: string[] = [
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849700/Placeholder/UserIcons/Creative-Tail-Animal-bat_mxwakp.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849700/Placeholder/UserIcons/Creative-Tail-Animal-bear_ism3hi.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849700/Placeholder/UserIcons/Creative-Tail-Animal-bee_p7t7ht.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849700/Placeholder/UserIcons/Creative-Tail-Animal-bird_whd07i.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849700/Placeholder/UserIcons/Creative-Tail-Animal-bug_mf1egg.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849700/Placeholder/UserIcons/Creative-Tail-Animal-butterfly_t4bupb.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849701/Placeholder/UserIcons/Creative-Tail-Animal-cat_vkypgk.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849701/Placeholder/UserIcons/Creative-Tail-Animal-cheetah_culvut.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849702/Placeholder/UserIcons/Creative-Tail-Animal-chicken_dc7tsg.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849701/Placeholder/UserIcons/Creative-Tail-Animal-coala_nefhq1.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849702/Placeholder/UserIcons/Creative-Tail-Animal-cow_ukbwma.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849702/Placeholder/UserIcons/Creative-Tail-Animal-crocodile_mxasih.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849703/Placeholder/UserIcons/Creative-Tail-Animal-dinosaur_bobhxi.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849703/Placeholder/UserIcons/Creative-Tail-Animal-dog_r0f8fk.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849703/Placeholder/UserIcons/Creative-Tail-Animal-dolphin_uk292c.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849704/Placeholder/UserIcons/Creative-Tail-Animal-dove_qcvmxl.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849703/Placeholder/UserIcons/Creative-Tail-Animal-duck_bzbdsq.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849703/Placeholder/UserIcons/Creative-Tail-Animal-eagle_sprwnj.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849704/Placeholder/UserIcons/Creative-Tail-Animal-elephant_wwywwy.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849705/Placeholder/UserIcons/Creative-Tail-Animal-fish_w3nhbh.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849705/Placeholder/UserIcons/Creative-Tail-Animal-flamingo_aoshhy.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849705/Placeholder/UserIcons/Creative-Tail-Animal-fox_f8jijp.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849705/Placeholder/UserIcons/Creative-Tail-Animal-frog_rcwrlt.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849705/Placeholder/UserIcons/Creative-Tail-Animal-giraffe_mvfstp.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849705/Placeholder/UserIcons/Creative-Tail-Animal-gorilla_uzay3v.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849708/Placeholder/UserIcons/Creative-Tail-Animal-horse_npb0wz.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849706/Placeholder/UserIcons/Creative-Tail-Animal-kangoroo_np0ubn.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849707/Placeholder/UserIcons/Creative-Tail-Animal-leopard_d1wrtj.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849706/Placeholder/UserIcons/Creative-Tail-Animal-lion_queceh.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849707/Placeholder/UserIcons/Creative-Tail-Animal-monkey_qh8s9w.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849707/Placeholder/UserIcons/Creative-Tail-Animal-mouse_w6fbct.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849707/Placeholder/UserIcons/Creative-Tail-Animal-panda_wk7fmn.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849708/Placeholder/UserIcons/Creative-Tail-Animal-parrot_unqr65.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849708/Placeholder/UserIcons/Creative-Tail-Animal-penguin_p5een4.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849708/Placeholder/UserIcons/Creative-Tail-Animal-shark_kgc0va.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849709/Placeholder/UserIcons/Creative-Tail-Animal-sheep_civgh4.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849710/Placeholder/UserIcons/Creative-Tail-Animal-snake_ufyvbf.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849709/Placeholder/UserIcons/Creative-Tail-Animal-spider_ikpjbz.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849709/Placeholder/UserIcons/Creative-Tail-Animal-squirrel_t4sdfd.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849709/Placeholder/UserIcons/Creative-Tail-Animal-star-fish_wj4sxg.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849710/Placeholder/UserIcons/Creative-Tail-Animal-tiger_amomuw.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849710/Placeholder/UserIcons/Creative-Tail-Animal-turtle_dmmvk6.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849711/Placeholder/UserIcons/Creative-Tail-Animal-wolf_cwibhv.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849711/Placeholder/UserIcons/Creative-Tail-Animal-zebra_ic3iuf.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676884516/Placeholder/UserIcons/Creative-Tail-Halloween-bat_dcrwn7.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849710/Placeholder/UserIcons/Creative-Tail-Halloween-black-cat_do4mcd.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676884516/Placeholder/UserIcons/Creative-Tail-Halloween-owl_cnujv1.svg",
    "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676884516/Placeholder/UserIcons/Creative-Tail-Halloween-spider_fsrjns.svg"
]

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function truncate(value: string, maxLength: number) {
    if (value.length <= maxLength) return value; // Nothing to do
    let coma = value.indexOf(",");
    // let newValue = value.slice(coma + 1);
    let newValue = value.substring(coma + 1);
    if (newValue.length >= maxLength) {
    let secondComa = newValue.indexOf(",");
        newValue = newValue.substring(secondComa + 1);
    }
    return newValue;
}