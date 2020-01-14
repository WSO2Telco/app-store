package org.appstore.core.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.sql.Connection;
import java.sql.PreparedStatement;
import com.wso2telco.core.dbutils.DbUtils;
import com.wso2telco.core.dbutils.exception.BusinessException;
import com.wso2telco.core.dbutils.exception.ServiceError;
import com.wso2telco.core.dbutils.util.DataSourceNames;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.appstore.core.dto.Reply;
import org.appstore.core.dto.Topic;
import org.appstore.core.util.Tables;

public class ForumDataProvider {

	private static final Logger logger = Logger.getLogger(ForumDataProvider.class.getName());
	
	public Topic getTopic(int topicID) throws BusinessException {


		Connection con = null;
		ResultSet rs = null;
		PreparedStatement ps = null;

		Topic topic=null;
		try {

			con = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
			if (con == null) {

	            logger.log(Level.SEVERE, "unable to open " + DataSourceNames.WSO2TELCO_DEP_DB + " database connection");

				throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
			}

			StringBuilder query = new StringBuilder("select id, title, author, date, content from ");
			
			query.append(Tables.FORUM_TOPICS.getTObject());

			query.append(" where id=? ");
			ps = con.prepareStatement(query.toString());


			logger.log(Level.INFO, "sql query in getTopic : " + ps);

			ps.setInt(1, topicID);
			
			rs = ps.executeQuery();
			topic=new Topic();

			while (rs.next()) {

				int topicIDinDB=rs.getInt(1);
				topic.setId(topicIDinDB);
				topic.setTitle(rs.getString(2));
				topic.setAuthor(rs.getString(3)); 
				topic.setDate(rs.getDate(4));
				List<Reply> list=getReplies(topicID);
				topic.setReplyCount(list.size());
				topic.setReplies(list);
				topic.setContent(rs.getString(5));
			}
		} catch (SQLException e) {

            logger.log(Level.SEVERE, "database operation error in getTopic : ", e);

			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} catch (Exception e) {

			logger.log(Level.SEVERE, "error in getTopic : ", e);
			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} finally {

			DbUtils.closeAllConnections(ps, con, rs);
		}

		return topic;
	}
	
	
	
	public List<Topic> getTopics(int start,int count) throws BusinessException {


		Connection con = null;
		ResultSet rs = null;
		PreparedStatement ps = null;
		
		List<Topic> topics=new ArrayList<Topic>();
		
		try {

			con = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
			if (con == null) {

	            logger.log(Level.SEVERE, "unable to open " + DataSourceNames.WSO2TELCO_DEP_DB + " database connection");
				throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
			}

			StringBuilder query = new StringBuilder("select id, title, author, date, content from ");
			
			query.append(Tables.FORUM_TOPICS.getTObject());

			query.append(" order by date desc limit ?,? ");
			
			ps = con.prepareStatement(query.toString());

			logger.log(Level.INFO, "sql query in getTopics : " + ps);

			ps.setInt(1, start);
			ps.setInt(2, count);
			
			rs = ps.executeQuery();
			
			while (rs.next()) {

				Topic topic=new Topic();
				int topicID=rs.getInt(1);
				topic.setId(topicID);
				topic.setTitle(rs.getString(2));
				topic.setAuthor(rs.getString(3)); 
				topic.setDate(rs.getDate(4));
				topic.setContent(rs.getString(5));
				List<Reply> list=getReplies(topicID);
				topic.setReplyCount(list.size());
				topic.setReplies(list);
				topics.add(topic);
			}
		} catch (SQLException e) {

            logger.log(Level.SEVERE, "database operation error in getTopics : ", e);

			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} catch (Exception e) {

			logger.log(Level.SEVERE, "error in getTopics : ", e);
			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} finally {

			DbUtils.closeAllConnections(ps, con, rs);
		}

		return topics;
	}
	
	
	
	
	
	
	
	
	public Reply getReply(int replyID) throws BusinessException {


		Connection con = null;
		ResultSet rs = null;
		PreparedStatement ps = null;

		Reply reply=null;
		try {

			con = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
			if (con == null) {

	            logger.log(Level.SEVERE, "unable to open " + DataSourceNames.WSO2TELCO_DEP_DB + " database connection");
				throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
			}

			StringBuilder query = new StringBuilder("select id, replyText, replyUsername, datetime, topicId from");
			
			query.append(Tables.FORUM_REPLIES.getTObject());

			ps = con.prepareStatement(query.toString());

			query.append(" where id=? ");
			logger.log(Level.INFO, "sql query in getReply : " + ps);

			ps.setInt(1, replyID);
			
			rs = ps.executeQuery();
			reply=new Reply();

			while (rs.next()) {

				reply.setReplyId(rs.getInt(1));
				reply.setReplyText(rs.getString(2));
				reply.setReplyUsername(rs.getString(3)); 
				reply.setTime(rs.getDate(4));
				reply.setTopicID(rs.getInt(5));
			}
			
		} catch (SQLException e) {

            logger.log(Level.SEVERE, "database operation error in getReply : ", e);

			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} catch (Exception e) {

			logger.log(Level.SEVERE, "error in getReply : ", e);
			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} finally {

			DbUtils.closeAllConnections(ps, con, rs);
		}

		return reply;
	}
	
	
	
	public List<Reply> getReplies(int topicID) throws BusinessException {


		Connection con = null;
		ResultSet rs = null;
		PreparedStatement ps = null;
		
		List<Reply> replies=new ArrayList<Reply>();
		
		try {

			con = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
			if (con == null) {

	            logger.log(Level.SEVERE, "unable to open " + DataSourceNames.WSO2TELCO_DEP_DB + " database connection");
				throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
			}

			StringBuilder query = new StringBuilder("select id, replyText, replyUsername, datetime, topicId from ");
			
			query.append(Tables.FORUM_REPLIES.getTObject());

			query.append(" where  topicId=? ");
			
			ps = con.prepareStatement(query.toString());

			logger.log(Level.INFO, "sql query in getReplies : " + ps);

			ps.setInt(1, topicID);
			
			rs = ps.executeQuery();
			
			while (rs.next()) {

				Reply reply=new Reply();
				
				reply.setReplyId(rs.getInt(1));
				reply.setReplyText(rs.getString(2));
				reply.setReplyUsername(rs.getString(3)); 
				reply.setTime(rs.getDate(4));
				reply.setTopicID(rs.getInt(5));
				
				replies.add(reply);
			}
		} catch (SQLException e) {

            logger.log(Level.SEVERE, "database operation error in getReplies : ", e);

			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} catch (Exception e) {

			logger.log(Level.SEVERE, "error in getReplies : ", e);
			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} finally {

			DbUtils.closeAllConnections(ps, con, rs);
		}

		return replies;
	}
	
	public Reply addReply(Reply reply) throws BusinessException {

		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		
		Reply replyInDB=null;
		
		try {

			con = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
			if (con == null) {

	            logger.log(Level.SEVERE, "unable to open " + DataSourceNames.WSO2TELCO_DEP_DB + " database connection");
				throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
			}

			StringBuilder query = new StringBuilder("insert into ");
			query.append(Tables.FORUM_REPLIES.getTObject());
			query.append(" (replyText, replyUsername, datetime, topicId)");
			query.append(" values");
			query.append(" (?, ?, now(), ?)");

			ps = con.prepareStatement(query.toString(), Statement.RETURN_GENERATED_KEYS);

			logger.log(Level.INFO, "sql query in addReply : " + ps);

			ps.setString(1, reply.getReplyText());
			ps.setString(2, reply.getReplyUsername());
			ps.setInt(3, reply.getTopicID());

			ps.executeUpdate();

			rs = ps.getGeneratedKeys();

			replyInDB=new Reply();
			while (rs.next()) {

				int replyID = rs.getInt(1);
				replyInDB.setReplyId(replyID);
			}

		} catch (SQLException e) {

            logger.log(Level.SEVERE, "database operation error in addReply : ", e);

			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} catch (Exception e) {

			logger.log(Level.SEVERE, "error in addReply : ", e);
			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} finally {

			DbUtils.closeAllConnections(ps, con, rs);
		}

		return replyInDB;
	}
	
	
	public Topic addTopic(Topic topic) throws BusinessException {

		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		
		Topic topicInDB=null;
		
		try {

			con = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
			if (con == null) {

	            logger.log(Level.SEVERE, "unable to open " + DataSourceNames.WSO2TELCO_DEP_DB + " database connection");
				throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
			}

			StringBuilder query = new StringBuilder("insert into ");
			query.append(Tables.FORUM_TOPICS.getTObject());
			query.append(" (title, author, date, content)");
			query.append(" values");
			query.append(" (?, ?, now(), ?)");

			ps = con.prepareStatement(query.toString(), Statement.RETURN_GENERATED_KEYS);

			logger.log(Level.INFO, "sql query in addTopic : " + ps);

			ps.setString(1, topic.getTitle());
			ps.setString(2, topic.getAuthor());
			ps.setString(3, topic.getContent());
			logger.log(Level.INFO, "sql query in addTopic : " + ps);
			ps.executeUpdate();

			rs = ps.getGeneratedKeys();

			topicInDB=new Topic();
			while (rs.next()) {

				int topicID = rs.getInt(1);
				topicInDB.setId(topicID);
			}

		} catch (SQLException e) {

            logger.log(Level.SEVERE, "database operation error in addTopic : ", e);

			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} catch (Exception e) {

			logger.log(Level.SEVERE, "error in addTopic : ", e);
			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} finally {

			DbUtils.closeAllConnections(ps, con, rs);
		}

		return topicInDB;
	}
	
	
	public Reply deleteReply(Reply reply) throws BusinessException {

		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {

			con = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
			if (con == null) {

	            logger.log(Level.SEVERE, "unable to open " + DataSourceNames.WSO2TELCO_DEP_DB + " database connection");
				throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
			}

			StringBuilder query = new StringBuilder("delete from ");
			query.append(Tables.FORUM_REPLIES.getTObject());
			query.append(" where id = ?");

			ps = con.prepareStatement(query.toString());

			logger.log(Level.INFO, "sql query in deleteReply : " + ps);

			ps.setInt(1, reply.getReplyId());

			ps.executeUpdate();
		} catch (SQLException e) {

            logger.log(Level.SEVERE, "database operation error in deleteReply : ", e);

			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} catch (Exception e) {

			logger.log(Level.SEVERE, "error in deleteReply : ", e);
			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} finally {

			DbUtils.closeAllConnections(ps, con, rs);
		}

		return reply;
	}
	
	
	public boolean deleteReplies(Topic topic) throws BusinessException {

		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {

			con = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
			if (con == null) {

	            logger.log(Level.SEVERE, "unable to open " + DataSourceNames.WSO2TELCO_DEP_DB + " database connection");
				throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
			}

			StringBuilder query = new StringBuilder("delete from ");
			query.append(Tables.FORUM_REPLIES.getTObject());
			query.append(" where topicId = ?");

			ps = con.prepareStatement(query.toString());

			logger.log(Level.INFO, "sql query in deleteReplies : " + ps);
			ps.setInt(1, topic.getId());

			ps.executeUpdate();
		} catch (SQLException e) {

            logger.log(Level.SEVERE, "database operation error in deleteReplies : ", e);

			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} catch (Exception e) {

			logger.log(Level.SEVERE, "error in deleteReplies : ", e);
			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} finally {

			DbUtils.closeAllConnections(ps, con, rs);
		}

		return true;
	}
	
	
	public Topic deleteTopic(Topic topic) throws BusinessException {

		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {

			con = DbUtils.getDbConnection(DataSourceNames.WSO2TELCO_DEP_DB);
			if (con == null) {

	            logger.log(Level.SEVERE, "unable to open " + DataSourceNames.WSO2TELCO_DEP_DB + " database connection");
				throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
			}

			StringBuilder query = new StringBuilder("delete from ");
			query.append(Tables.FORUM_TOPICS.getTObject());
			query.append(" where id = ?");

			ps = con.prepareStatement(query.toString());


            logger.log(Level.INFO, "sql query in deleteTopic : " + ps);

			ps.setInt(1, topic.getId());
			
			deleteReplies(topic);
			
			ps.executeUpdate();
		} catch (SQLException e) {

            logger.log(Level.SEVERE, "database operation error in deleteTopic : ", e);

			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} catch (Exception e) {

			logger.log(Level.SEVERE, "error in deleteTopic : ", e);
			throw new BusinessException(ServiceError.SERVICE_ERROR_OCCURED);
		} finally {

			DbUtils.closeAllConnections(ps, con, rs);
		}

		return topic;
	}
	
	
	
	
	
	
}
