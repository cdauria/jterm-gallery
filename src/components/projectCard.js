import styles from '../components/projectCard.module.css'

const ProjectCard = ({ item }) => {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
        <h1 className={styles.title}>{item.projectTitle}</h1>
          {item.media && (
            <img src={item.media} alt={item.projectTitle} className={styles.image} />
          )}
          <h1 className={styles.name}>{item.name}</h1>
          <p className={styles.description}>{item.description}</p>
        </div>
      </div>
    )
  }
  
  export default ProjectCard