/**
 * @author  sai
 * created  2024-08-09
 * project  off_da_rails_coffee
 */
import { format } from 'date-fns';

export default class DateUtils {
  static formatDateShort(dateString: string): string {
    if (!dateString) return '';
    return format(new Date(dateString), 'LLLL d, yyyy');
  }
}
