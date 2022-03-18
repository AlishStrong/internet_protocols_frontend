const createSession = async (sessionInfo, creatorName) => {
  console.log(`SessionService.createSession() sessionInfo ${sessionInfo}${creatorName ? ', creatorName ' + creatorName : ''}`)
  return { sessionInfo, creatorName }
}

export default {
  createSession
}
