
export const formatDate = (date?: string | null) => {
    if (!date) return ''
    try {
      return new Intl.DateTimeFormat('hi-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(date))
    } catch {
      return ''
    }
  }