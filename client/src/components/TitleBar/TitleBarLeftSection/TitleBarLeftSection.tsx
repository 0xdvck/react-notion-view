import styles from './TitleBarLeftSection.module.css'


type TitleBarLeftSectionProps = {
    children: React.ReactNode;
}


export const TitleBarLeftSection = ({children}: TitleBarLeftSectionProps) => {
    return <div className={styles.titleBarLeftSection}>{children}</div>
}